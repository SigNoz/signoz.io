import TableWrapper from '@/components/TableWrapper'

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
        <p className="mb-3">
          The following table describes the hardware requirements that are needed to install SigNoz
          on Kubernetes:
        </p>
        <TableWrapper>
          <thead>
            <tr>
              <th>Component</th>
              <th>Minimal Requirements</th>
              <th>Recommended</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Memory</td>
              <td>8 GB</td>
              <td>16 GB</td>
            </tr>
            <tr>
              <td>CPU</td>
              <td>4 cores</td>
              <td>8 cores</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>30 GB</td>
              <td>80 GB</td>
            </tr>
          </tbody>
        </TableWrapper>
      </li>
    </ul>
  )
}
