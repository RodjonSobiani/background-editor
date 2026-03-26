import { memo, useState } from 'react';
import Icon from '@mdi/react';
import { mdiMinus, mdiPlus } from '@mdi/js';

interface IAccordionOption {
  label: string;
  value: string;
  onclick?: () => void;
}

interface IAccordionProps {
  title: string;
  options: IAccordionOption[];
  label?: string;
  isOpen?: boolean;
}

const Accordion = ({ title, options, isOpen = false }: IAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={'accordion border-border border-b pb-8'}>
      <button onClick={toggleAccordion}>
        <div className="h3-golos-regular flex justify-between text-start">
          {title}
          <Icon path={isExpanded ? mdiMinus : mdiPlus} size="28px" className={'accordion-icon min-h-7 min-w-7'} />
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

export default memo(Accordion);
