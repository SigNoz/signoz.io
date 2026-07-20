import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@signozhq/ui/table'
import { Typography } from '@signozhq/ui/typography'

export default function CommonPrerequisites() {
  return (
    <ul>
      <li>
        Kubernetes version &gt;= <code>1.22</code>
      </li>
      <li>
        Currently supports <code>x86-64</code>, <code>amd64</code> and <code>arm64</code>{' '}
        architectures
      </li>
      <li>
        Helm version &gt;= <code>3.8</code>
      </li>
      <li>
        You must have <code>kubectl</code> access to your cluster
      </li>
      <li>
        <Typography.Text as="p" className="mb-3">
          The following table describes the hardware requirements that are needed to install SigNoz
          on Kubernetes:
        </Typography.Text>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component</TableHead>
              <TableHead>Minimal Requirements</TableHead>
              <TableHead>Recommended</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Memory</TableCell>
              <TableCell>8 GB</TableCell>
              <TableCell>16 GB</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CPU</TableCell>
              <TableCell>4 cores</TableCell>
              <TableCell>8 cores</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Storage</TableCell>
              <TableCell>30 GB</TableCell>
              <TableCell>80 GB</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </li>
    </ul>
  )
}
