// /**
//  * If you want to enable locale keys typechecking and enhance IDE experience.
//  *
//  * Requires `resolveJsonModule:true` in your tsconfig.json.
//  *
//  * @link https://www.i18next.com/overview/typescript
//  */
// import 'i18next';
//
// // resources.ts file is generated with `npm run toc`
// import resources from './resources.ts';
//
// // declare module 'i18next' {
// //   interface CustomTypeOptions {
// //     defaultNS: 'common'
// //     resources: typeof resources
// //   }
// // }
//
// declare module 'react-i18next' {
//   interface CustomTypeOptions {
//     defaultNS: 'common'
//     resources: typeof resources['en']
//   }
// }
//
// declare module 'i18next' {
//   interface CustomTypeOptions {
//     returnNull: false;
//     saveMissing: true;
//     // resources: typeof resources,
//   }
// }
