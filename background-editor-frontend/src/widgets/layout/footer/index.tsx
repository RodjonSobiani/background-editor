import Logo from '@shared/components/logo';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const FOOTER_LINKS = [
  { title: 'tools', subLinks: [{ title: 'removeBackground' }, { title: 'apiDocs' }] },
  {
    title: 'applicationPossibilities',
    subLinks: [
      { title: 'individuals' },
      { title: 'developers' },
      { title: 'onlineCommerce' },
      { title: 'journalists' },
      { title: 'carSellers' },
      { title: 'organizations' }
    ]
  },
  {
    title: 'support',
    subLinks: [{ title: 'faq' }, { title: 'tariff' }, { title: 'refunds' }]
  },
  { title: 'company', subLinks: [{ title: 'articles' }, { title: 'aboutUs' }] }
];

const year = new Date().getFullYear();

const Footer = () => {
  const t = useTranslations('footer');
  return (
    <footer className={'footer-base'}>
      <div className={'footer-links'}>
        <div className={'space-y-6'}>
          <Logo />
          <div className={'space-y-6'}>
            <p className={'body-18px-golos-medium'}>{t('contacts')}</p>
            <div className={'body-14px-golos-regular text-secondary space-y-2'}>
              <p>+92 302 300 3215</p>
              <p>ouraddress@email.com</p>
            </div>
          </div>
        </div>
        <div className={'footer-links-content'}>
          {FOOTER_LINKS.map((link, index) => (
            <div key={index} className={'space-y-6'}>
              <p className={'body-18px-golos-medium'}>{t(`${link.title}.title`)}</p>
              <div className={'footer-links-link body-14px-golos-regular'}>
                {link.subLinks.map((subLink, subIndex) => (
                  <p key={`sub-${subIndex}`}>{t(`${link.title}.${subLink.title}`)}</p>
                ))}
              </div>
            </div>
          ))}
          <div />
        </div>
      </div>
      <div className={'footer-copyright'}>
        <div className={'body-12px-golos-medium footer-copyright-politic'}>
          <Link href="/terms-of-use">{t('copyrights.rules')}</Link>
          <Link href="/policy">{t('copyrights.policy')}</Link>
        </div>
        <div className={'footer-copyright-ipst'}>
          <div className={'flex flex-col items-end gap-2'}>
            <span className={'body-14px-golos-regular'}>Developed by</span>
            <span className={'body-14px-golos-regular'}>Rodjon Sobiani</span>
            <span className={'body-12px-golos-medium'}>© 2024 - {year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
