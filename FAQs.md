# FAQs for this project

1- Installation of the Chakra UI dependencies: `npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`
2- Then we need to install a provider for chakra UI:

- we need to import Chakra UI in the main.tsx: `import { ChakraProvider } from "@chakra-ui/react";`
- and then wrap our App with the provider:

```typescript
<ChakraProvider>
  <App />
</ChakraProvider>
```

## 1. Grid component - chakra UI

The grid component is one of the components that chkra ui provides us. we can use it like this:

```typescript
<Grid templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}>
  <GridItem area="nav" bg="coral">
    Nav
  </GridItem>
  <Show above="lg">
    <GridItem area="aside" bg="gold">
      Aside
    </GridItem>
  </Show>
  <GridItem area="main" bg="dodgerblue">
    Main
  </GridItem>
</Grid>
```

The templateAreas can receive an object. In the one we provided above, we are setting the mobile devices template (base) and the large devices (lg - this is above 1024px). the Show component will only show some components given some conditions, like the "above" will only show the HTML above a certain size. In this case it will only show over 1024px

## 2. Erros

Quando temos um erro deste género: "Element implicitly has an type because expression of type can't be used to index type" (no exemplo em baixo, acontece no map), exemplo:

```javscript
const iconMap = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };

  platforms.map((platform) => (
        <Icon as={iconMap[platform.slug]} />
      ))
```

o que temos de fazer é o seguinte:

```javscript
const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };
```
definimos primeiro que vai ter uma key do tipo string e que a propriedade que se vai buscar é do tipo IconType