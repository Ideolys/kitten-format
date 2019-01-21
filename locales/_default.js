export default {
  locale       : 'fr-FR',
  currency     : 'EUR',
  precision    : 2,
  unitPrefixes : {
    15   : { default : 'P', g : 'GT' },
    12   : { default : 'T', g : 'MT' },
    9    : { default : 'G', g : 'kT' },
    6    : { default : 'M', g : 'T'  },
    3    : 'k',
    0    : '',
    '-3' : 'm',
    '-6' : 'μ',
    '-9' : 'n'
  }
}
