import { memo, useRef, useState } from 'react';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';

interface IHeaderAccordionOption {
  label: string;
  value: string;
  onclick?: () => void;
}

interface IHeaderAccordionProps {
  title: string;
  options: IHeaderAccordionOption[];
  label?: string;
  isOpen?: boolean;
}

const HeaderAccordion = ({ title, options, isOpen = false }: IHeaderAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const accordionRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div ref={accordionRef} className="accordion">
      <button onClick={toggleAccordion}>
        <div className="accordion-button-content body-18px-golos-medium">
          {title}
          <Icon
            path={mdiChevronDown}
            size="20px"
            className={`accordion-icon ${isExpanded ? 'accordion-icon--open' : ''}`}
          />
        </div>
      </button>

      {isExpanded && (
        <ul className="accordion-list">
          {options.map((option) => (
            <li key={option.value} onClick={() => option.onclick?.()}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(HeaderAccordion);
