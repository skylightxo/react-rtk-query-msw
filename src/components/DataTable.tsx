import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useGetDataQuery } from "src/services";

export const DataTable = () => {
  const { data, isLoading } = useGetDataQuery(undefined, {
    skip: false,
  });
  return (
    <Table variant="simple">
      <TableCaption>Data generated randomly</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Address</Th>
          <Th>Company</Th>
          <Th isNumeric>Years of exp</Th>
          <Th>Timezone</Th>
          <Th isNumeric>age</Th>
          <Th>Profession</Th>
          <Th>Phone</Th>
          <Th>Bio</Th>
        </Tr>
      </Thead>
      <Tbody>
        {!isLoading && data?.data.length ? (
          <>
            {data.data.map((d) => (
              <Tr>
                <Td>{d.name}</Td>
                <Td>{d.address}</Td>
                <Td>{d.company}</Td>
                <Td isNumeric>{d.yearsOfExperience}</Td>
                <Td>{d.timezone.text}</Td>
                <Td isNumeric>{d.age}</Td>
                <Td>{d.profession}</Td>
                <Td>{d.phone}</Td>
                <Td>{d.bio}</Td>
              </Tr>
            ))}
          </>
        ) : (
          <Spinner />
        )}
      </Tbody>
    </Table>
  );
};
