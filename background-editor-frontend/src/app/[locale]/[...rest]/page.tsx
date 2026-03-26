import { notFound } from 'next/navigation';

export default function CatchAllPage() {
  notFound();
}

// Or just [...not-found]/page.tsx without [...rest]/page.tsx + [locale]/not-found.tsx:
// const NotFound = () => {
//   return (
//     <div className="container">
//       <h1>404 - Страница не найдена</h1>
//       <p>Проверьте URL или вернитесь на главную</p>
//     </div>
//   );
// };
//
// export default NotFound;
