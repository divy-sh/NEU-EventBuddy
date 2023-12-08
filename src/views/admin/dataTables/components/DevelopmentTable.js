/* eslint-disable */
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import {
  MdModeEdit, MdDelete
} from "react-icons/md";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import Menu from "components/menu/MainMenu";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function DevelopmentTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  console.log('TableData', tableData)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Events Table
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {tableData.map((tData, index) => {
            console.log(tData.event_name);
            return (
              <Tr key={index}>
                <Td
                  fontSize={{ sm: "14px" }}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                      {tData.event_name}
                    </Text>
                  </Flex>
                </Td> 
                <Td
                  fontSize={{ sm: "14px" }}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                      {tData.event_description}
                    </Text>
                  </Flex>
                </Td> 
                <Td
                  fontSize={{ sm: "14px" }}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                      {tData.start_time}
                    </Text>
                  </Flex>
                </Td> 
                <Td
                  fontSize={{ sm: "14px" }}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                      {tData.end_time}
                    </Text>
                  </Flex>
                </Td> 
                <Td
                  fontSize={{ sm: "14px" }}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor='transparent'>
                  <Flex align='center'>
                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                      {tData.last_registration_date}
                    </Text>
                  </Flex>
                </Td> 
                <Td>
                  <Icon onClick={()=>{console.log("Edit")}} as={MdModeEdit} width='20px' height='20px' color='inherit' />
                  <Icon onClick={()=>{console.log("Delete")}} as={MdDelete} width='20px' height='20px' color='inherit' />
                </Td>     
            </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
