import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Currency } from "../../types/types";

type TableProps = {
  data: Currency[];
};

export const CurrencyTable: React.FC<TableProps> = ({ data }) => {
  return (
    <Box maxWidth="md" width="100%">
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Currency/Current Date</TableCell>
              <TableCell>Buy</TableCell>
              <TableCell>Sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.ccy}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {item.ccy}/{item.base_ccy}
                </TableCell>
                <TableCell>{item.buy}</TableCell>
                <TableCell>{item.sale}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
