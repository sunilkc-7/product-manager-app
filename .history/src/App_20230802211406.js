<thead>
  <tr>
    {brandNames.filter(productsInBrand).map((brandName) => (
      <th key={brandName}>{brandName}</th>
    ))}
  </tr>
</thead>;
