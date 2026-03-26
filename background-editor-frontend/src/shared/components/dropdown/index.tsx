import { cloneElement, memo, useEffect, useRef, useState } from 'react';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import { IDropdownOption, IDropdownProps } from '@shared/interfaces/ui';

const Dropdown = ({
  options,
  label,
  className = '',
  labelComponent,
  isSelected = false,
  position = 'left',
  onSelect,
  selectedValue,
  listContainerClassName
}: IDropdownProps) => {
  const [selected, setSelected] = useState<IDropdownOption | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSelected = options.find((option) => option.value === selectedValue) ?? null;
    setSelected(newSelected);
  }, [selectedValue, options]);

  useEffect(() => {
    setSelected(options.find((option) => option.label === label) ?? null);

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [label, options]);

  const handleOptionClick = (option: IDropdownOption) => {
    if (isSelected) {
      setSelected(option);
    }
    option.onClick?.();
    onSelect?.(option.value);
    setIsOpen(false);
  };

  const getDropdownPosition = () => {
    switch (position) {
      case 'center':
        return 'dropdown-menu-center';
      case 'right':
        return 'dropdown-menu-right';
      default:
        return 'dropdown-menu-left';
    }
  };

  const handleOpenDropdown = () => setIsOpen(!isOpen);

  return (
    <div ref={dropdownRef} className={`dropdown ${className}`}>
      {labelComponent ? (
        cloneElement(labelComponent, { onClick: handleOpenDropdown })
      ) : (
        <button className="button" onClick={handleOpenDropdown}>
          <div className="button-content">
            {selected?.label || label}
            <Icon
              path={mdiChevronDown}
              size="20px"
              className={`dropdown-icon ${isOpen ? 'dropdown-icon--open' : ''}`}
            />
          </div>
        </button>
      )}

      {isOpen && (
        <ul className={`dropdownMenu ${getDropdownPosition()} ${listContainerClassName}`}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`option ${selected?.value === option.value ? 'selected' : 'unselected'}`}
              onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(Dropdown);
