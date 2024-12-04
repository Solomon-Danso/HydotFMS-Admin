import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { Box, Button, Flex, Menu, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom'; 
import { apiMedia } from './Endpoint';
import * as XLSX from 'xlsx';

const HydotTable = ({ columns: propColumns, data: propData, media, menuItems = [], onRowSelectionChange }) => { // Default to an empty array if not provided
  const navigate = useNavigate(); 

  const columns = propColumns.map((column) => ({
    ...column,
    Cell: ({ cell }) => {
      const mediaColumn = media?.find((mediaItem) => mediaItem.accessorKey === column.accessorKey);
      const cellValue = cell.getValue();

      // Render media if available
      if (mediaColumn && cellValue) {
        const mediaSrc = cellValue;
        const isImage = /\.(jpg|webp|jpeg|png|gif)$/i.test(mediaSrc);
        const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaSrc);



        return isImage ? (
          <img
            alt={mediaColumn.header}
            src={`${apiMedia}${mediaSrc}`}
            style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }}
          />
        ) : isVideo ? (
          <video
            style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }}
            muted
            loop
          >
            <source src={`${apiMedia}${mediaSrc}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Text>No media</Text>
        );
      }

      // Default rendering for cell value if no media
      return <Text>{cellValue ?? 'No data'}</Text>;
    },
  }));

  const data = propData || [];

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enablePinning: true,
    enableRowActions: true,
    enableRowSelection: true,

    onRowSelectionChange: () => {
      // Iterate over each row and call onRowSelectionChange for each row
      data.forEach((row) => {
        onRowSelectionChange(row); // Call onRowSelectionChange with each row
      });
    },
    
    
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'xl',
      size: 'lg',
    },
    mantineSearchTextInputProps: {
      placeholder: 'Search for anything',
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
        }}
      >
        {media?.map(({ accessorKey, header }) => {
          const mediaSrc = row.original[accessorKey];
          if (!mediaSrc) return null;
          const isImage = /\.(jpg|jpeg|webp|png|gif)$/i.test(mediaSrc);
          const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaSrc);
          return (
            <Box key={accessorKey} sx={{ width: '100%', textAlign: 'center' }}>
              <Title order={4} mb="sm">{header}</Title>
              {isImage ? (
                <img
                  alt={header}
                  src={`${apiMedia}${mediaSrc}`}
                  style={{
                    borderRadius: '8px',
                    width: '90vw',
                    maxWidth: '40%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              ) : isVideo ? (
                <video
                  controls
                  style={{
                    borderRadius: '8px',
                    width: '90vw',
                    maxWidth: '40%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                >
                  <source src={`${apiMedia}${mediaSrc}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Text>No media available</Text>
              )}
            </Box>
          );
        })}
      </Box>
    ),

    renderRowActionMenuItems: ({ row }) => (
      <>
        {menuItems.map((item, index) => (
          <Menu.Item
            key={index}
            icon={item.icon}
            onClick={() => {
              if (item.type === "navigate") {
                let pathWithParams = item.path;
                const regex = /:([a-zA-Z0-9]+)/g; 
                pathWithParams = pathWithParams.replace(regex, (match, key) => {
                  return row.original[key] || match; 
                });
                navigate(pathWithParams); 
              } else if (item.type === "function") {
                const params = item.columnNames.map(colName => row.original[colName]);
                item.onClick(...params); 
              }
            }}
          >
            {item.text}
          </Menu.Item>
        ))}
      </>
    ),

    renderTopToolbar: ({ table }) => {
      const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
        // Create a formatted date string
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-'); // Format as YYYY-MM-DD_HH-MM-SS
        const filename = `data_${formattedDate}.xlsx`; // Set the filename
      
        XLSX.writeFile(workbook, filename); // Use the new filename
      };
      
      const exportToCSV = () => {
        const csvData = data.map(row => Object.values(row).join(',')).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      return (
        <Flex p="md" justify="space-between">
          <Flex gap="xs">
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
          <Flex sx={{ gap: '8px' }}>


            <Button color="yellow" onClick={exportToExcel} variant="filled">
              Export to Excel
            </Button>
            <Button color="teal" onClick={exportToCSV} variant="filled">
              Export to CSV
            </Button>
          </Flex>
        </Flex>
      );
    },
  });

  return (
    <MantineReactTable
      table={table}
      id="mantine-react-table"
    />
  );
};

export default HydotTable;
