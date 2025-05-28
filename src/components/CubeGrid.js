export default function CubeGrid({ cube, updateCell }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {cube.map((layer, layerIndex) => (
        <div key={layerIndex} className="border p-2">
          <div className="text-center font-bold mb-1">Layer {layerIndex + 1}</div>
          <table className="table-fixed border border-black">
            <tbody>
              {layer.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={colIndex} className="border text-center w-8 h-8">
                      <input
                        type="number"
                        min="1"
                        max="9"
                        value={value || ''}
                        onChange={(e) =>
                          updateCell(layerIndex, rowIndex, colIndex, parseInt(e.target.value) || 0)
                        }
                        className="w-full text-center"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
