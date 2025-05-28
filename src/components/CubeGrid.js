export default function CubeGrid({ cube, updateCell }) {
  return (
    <div className="grid grid-cols-5 gap-8">
      {cube.map((grid, layerIndex) => (
        <div key={layerIndex} className="space-y-2">
          <h2 className="text-xl font-semibold mb-1">Layer {layerIndex + 1}</h2>
          <div className="grid grid-cols-9 gap-0">
            {grid.map((row, rowIndex) =>
              row.map((value, colIndex) => {
                const key = `${layerIndex}-${rowIndex}-${colIndex}`;
                const borderClasses = `
                  border 
                  ${rowIndex % 3 === 0 ? 'border-t-2' : 'border-t'}
                  ${colIndex % 3 === 0 ? 'border-l-2' : 'border-l'}
                  ${rowIndex === 8 ? 'border-b-2' : ''}
                  ${colIndex === 8 ? 'border-r-2' : ''}
                `;

                return (
                  <input
                    key={key}
                    type="text"
                    maxLength={1}
                    value={value || ''}
                    onChange={(e) => updateCell(layerIndex, rowIndex, colIndex, e.target.value)}
                    className={`w-10 h-10 text-center bg-white dark:bg-gray-700 text-black dark:text-white ${borderClasses}`}
                  />
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
