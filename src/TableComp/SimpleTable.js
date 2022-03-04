import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Name </th>
            <th> Description </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>John </td>
            <td>The average developer </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}