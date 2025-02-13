export const CustomToolbar = () => (
  <div id="toolbar">
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option defaultValue={'black'} />
    </select>
  </div>
);
