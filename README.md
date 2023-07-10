# kitten-format

Fast currency, number and string formatters for browsers.

## Getting Started

`npm install kitten-format`

## Installation

Two builds are available :
  - Default version: `kittenFormat.client.js`
  - Minified version: `kittenFormat.client.min.js`

Locales are not shipped with the builds. You must select the locales you want. Locales are defined in `locales/`.

Locale auto-register itself.

At runtime, kitten-format will try to set the default locale as the one defined by the browser.

**Available locales**

Lang                      | Locales
--------------------------|--------
Arabic (U.A.E.)           | `ar-AE`
Arabic (Egypt)            | `ar-EG`
Arabic (Morocco)          | `ar-MA`
Arabic (Saudi Arabia)     | `ar-SA`
German (Switzerland)      | `de-CH`
English (United Kingdom)  | `en-GB`
English (United States)   | `en-US`
Spanish (Spain)           | `es-ES`
French (Switzerland)      | `fr-CH`
French (French)           | `fr-FR`
French (French Polynesia) | `fr-PF`
Italian (Switzerland)     | `it-CH`

Default is `fr-FR`

## Use cases

### kittenFormat.setOptions

Set default locale options.

```js
 kittenFormat.setOptions({
    locale       : 'fr-FR', // default locale
    currency     : 'EUR',   // default currency
    precision    : 2,       // default precision
    unitPrefixes : {        // default unit prefixes
      '15' : 'P',
      '12' : 'T',
      '9'  : 'G',
      '6'  : 'M',
      '3'  : 'k',
      '0'  : '',
      '-3' : 'm',
      '-6' : 'μ',
      '-9' : 'n'
    },
    isCurrencyFirst   : true
  });
```

### kittenFormat.setOption

Set a default locale option.

```js
  kittenFormat.setOption('currency', 'GBP');
```

### Numbers

### kittenFormat.averageN (kittenFormat.averageNumber)

Average a number to default or specified locale.

```js
  kittenFormat.averageN(1234, {
    locale    : 'fr-FR',
    unit      : 'g',
    precision : 1
  });

  // res: '1,2 kg'

  // options
  {
    locale    : String,
    precision : Int, // number of decimal value
    unit      : String,
    power     : Int // current unit,
    maxPower  : Int
  }

  kittenFormat.averageN(1234, {
    locale    : 'fr-FR',
    unit      : 'g',
    precision : 2,
    power     : -3
  });

  // res: '1,23 g'

  kittenFormat.averageN(1234, {
    locale    : 'fr-FR',
    unit      : 'g',
    precision : 2,
    power     : 0,
    maxPower  : 0
  });

  // res: '1 234 g'
```

### kittenFormat.formatN (kittenFormat.formatNumber)

Format a number to default or specified locale.

```js
  kittenFormat.formatN(1234, {
    locale : 'fr-FR'
  });

  // res: '1 234'

  // options
  {
    locale    : String,
    precision : Int, // number of decimal value
    minimumFractionDigits : Int,
    shouldNotRound : Boolean
  }
```

### kittenFormat.percent

Set percentage of a number

```js
  kittenFormat.percent(0.193, {
    locale : 'fr-FR'
  });

  // res: '19,3%'

  // options
  {
    locale    : String,
    precision : Int, // number of decimal value
  }

  kittenFormat.percent(18.45, { isAlreadyPercentageNumber : true });

  // res: '18,45%'
```

### Currencies

### kittenFormat.formatC (kittenFormat.formatCurrency)

Format a currency to specified locale and/or currency. If convert options are specified, it makes the conversion.

```js
  kittenFormat.formatC(1234, {
    locale : 'fr-FR'
  });

  // res: '1 234€'

  // options
  {
    locale    : String,
    precision : Int, // number of decimal value
    currency  : String, // currency defined by ISO 4217
    shouldNotRound : Boolean
  }

  kittenFormat.formatC(1234.45, {
    locale    : 'en-GB',
    precision : 2,
    currency  : 'EUR'
  });

  // res: '€1,234.45'

  kittenFormat.formatC(1234.45, {
    locale    : 'en-GB',
    precision : 2,
    target    : 'EUR'
    rates     : {
      EUR : 0.8,
      GBP : 1
    }
  });

  // res: '€987.56'
```

### kittenFormat.convC (kittenFormat.convertCurrency)

Convert a currency to another one

```js
  kittenFormat.convC(1234, {
    locale : 'fr-FR',
    source : 'EUR',
    target : 'USD',
    rates  : { EUR : 1, USD : 1.3 }
  });

  // res: '1 604,2$'

  // options
  {
    locale    : String,
    precision : Int, // number of decimal value
    source    : String, // currency defined by ISO 4217
    target    : String, // currency defined by ISO 4217
    rates     : {
      '<source>' : Int,
      '<target>' : Int
    }
  }
```

### kittenFormat.averageC (kittenFormat.averageCurrency)

Average a currency to default or specified locale.

It can only average to € or k€.

```js
  kittenFormat.averageC(1234, {
    locale    : 'fr-FR'
  });

  // res: '1,2 k€'

  // options
  {
    locale    : String,
    power     : Int // current unit
  }
```

### Strings

### kittenFormat.lowerCase

Convert a string to Lowercase.

```js
  kittenFormat.lowerCase('ABC');

  // res: 'abc'
```

### kittenFormat.upperCase

Convert a string to uppercase.

```js
  kittenFormat.upperCase('abc');

  // res: 'ABC'
```

### kittenFormat.upperCaseFirstChar

Convert the first char of a string to uppercase.

```js
  kittenFormat.upperCaseFirstChar('abc');

  // res: 'Abc'
```
