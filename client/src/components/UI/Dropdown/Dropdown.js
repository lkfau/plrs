import { useEffect, useState } from 'react';

import styles from './Dropdown.module.css'

function Dropdown({ data, onBuildingSelect }) {
  const [selectedElement, setSelectedElement] = useState('test');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedElement(data[0])
  }, [data]);

  const onSelectElement = (el) => {
    setSelectedElement(el);
    onBuildingSelect(el.key);
    setDropdownOpen(false)
  }

  return (
    <div>
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
