import { useState } from 'react';

import styles from './Dropdown.module.css'

function Dropdown({ data, defaultValue, onSelect }) {
  const [selectedElement, setSelectedElement] = useState(data.find(d => d.key === defaultValue) ?? data[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onSelectElement = (el) => {
    setSelectedElement(el);
    onSelect(el.key);
    setDropdownOpen(false)
  }

  return (
    <div style={{position: 'relative'}}>
      <div className={styles.header} onClick={() => setDropdownOpen((o) => !o)}>
        {selectedElement.value}
      </div>
      {dropdownOpen && <div className={styles.container}>
        {data.map(el => (
        <div key={el.key} 
             value={el.key} 
             className={styles.element}
             onClick={() => onSelectElement(el)}>
            {el.value}
        </div>
        ))}
      </div>}
    </div>
  );
}

export default Dropdown;
