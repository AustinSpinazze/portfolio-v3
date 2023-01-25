/* 
{
  tableHeaders: [
    {
      value: "table header"
    }
  ],
  tableBody: [
    [
      {
        value: "table data"
      },
      {
        value: "table data"
      },
    ]
  ]
}
*/

const Table = ({ data }) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {data.tableHeaders.map((element) => {
                    return (
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        key={element.value}
                      >
                        {element.value}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.tableBody.map((row, index) => (
                  <tr key={index}>
                    {row.map((element) => {
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {element.value}
                      </td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
