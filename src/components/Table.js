import { Table as TableBasic } from 'react-bootstrap';

export default function Table({ headers, items }) {
    return (
        <TableBasic striped bordered hover>
            <thead>
                <tr>
                    {headers.map((header, index) =>
                        <th key={index}>{header.text}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) =>
                    <tr key={`tr${index}`}>
                        {headers.map((header, j) => <td key={`td${index}${j}`}> {item[header.value]} </td>)}
                    </tr>
                )}
            </tbody>
        </TableBasic>
    );
}