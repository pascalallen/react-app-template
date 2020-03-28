import _ from 'lodash';

const timezones: string[] = [
  'Africa/Abidjan',
  'Africa/Accra',
  'Africa/Addis_Ababa',
  'Africa/Algiers',
  'Africa/Asmara',
  'Africa/Bamako',
  'Africa/Bangui',
  'Africa/Banjul',
  'Africa/Bissau',
  'Africa/Blantyre',
  'Africa/Brazzaville',
  'Africa/Bujumbura',
  'Africa/Cairo',
  'Africa/Casablanca',
  'Africa/Ceuta',
  'Africa/Conakry',
  'Africa/Dakar',
  'Africa/Dar_es_Salaam',
  'Africa/Djibouti',
  'Africa/Douala',
  'Africa/El_Aaiun',
  'Africa/Freetown',
  'Africa/Gaborone',
  'Africa/Harare',
  'Africa/Johannesburg',
  'Africa/Juba',
  'Africa/Kampala',
  'Africa/Khartoum',
  'Africa/Kigali',
  'Africa/Kinshasa',
  'Africa/Lagos',
  'Africa/Libreville',
  'Africa/Lome',
  'Africa/Luanda',
  'Africa/Lubumbashi',
  'Africa/Lusaka',
  'Africa/Malabo',
  'Africa/Maputo',
  'Africa/Maseru',
  'Africa/Mbabane',
  'Africa/Mogadishu',
  'Africa/Monrovia',
  'Africa/Nairobi',
  'Africa/Ndjamena',
  'Africa/Niamey',
  'Africa/Nouakchott',
  'Africa/Ouagadougou',
  'Africa/Porto-Novo',
  'Africa/Sao_Tome',
  'Africa/Tripoli',
  'Africa/Tunis',
  'Africa/Windhoek',
  'America/Adak',
  'America/Anchorage',
  'America/Anguilla',
  'America/Antigua',
  'America/Araguaina',
  'America/Argentina/Buenos_Aires',
  'America/Argentina/Catamarca',
  'America/Argentina/Cordoba',
  'America/Argentina/Jujuy',
  'America/Argentina/La_Rioja',
  'America/Argentina/Mendoza',
  'America/Argentina/Rio_Gallegos',
  'America/Argentina/Salta',
  'America/Argentina/San_Juan',
  'America/Argentina/San_Luis',
  'America/Argentina/Tucuman',
  'America/Argentina/Ushuaia',
  'America/Aruba',
  'America/Asuncion',
  'America/Atikokan',
  'America/Bahia',
  'America/Bahia_Banderas',
  'America/Barbados',
  'America/Belem',
  'America/Belize',
  'America/Blanc-Sablon',
  'America/Boa_Vista',
  'America/Bogota',
  'America/Boise',
  'America/Cambridge_Bay',
  'America/Campo_Grande',
  'America/Cancun',
  'America/Caracas',
  'America/Cayenne',
  'America/Cayman',
  'America/Chicago',
  'America/Chihuahua',
  'America/Costa_Rica',
  'America/Creston',
  'America/Cuiaba',
  'America/Curacao',
  'America/Danmarkshavn',
  'America/Dawson',
  'America/Dawson_Creek',
  'America/Denver',
  'America/Detroit',
  'America/Dominica',
  'America/Edmonton',
  'America/Eirunepe',
  'America/El_Salvador',
  'America/Fort_Nelson',
  'America/Fortaleza',
  'America/Glace_Bay',
  'America/Godthab',
  'America/Goose_Bay',
  'America/Grand_Turk',
  'America/Grenada',
  'America/Guadeloupe',
  'America/Guatemala',
  'America/Guayaquil',
  'America/Guyana',
  'America/Halifax',
  'America/Havana',
  'America/Hermosillo',
  'America/Indiana/Indianapolis',
  'America/Indiana/Knox',
  'America/Indiana/Marengo',
  'America/Indiana/Petersburg',
  'America/Indiana/Tell_City',
  'America/Indiana/Vevay',
  'America/Indiana/Vincennes',
  'America/Indiana/Winamac',
  'America/Inuvik',
  'America/Iqaluit',
  'America/Jamaica',
  'America/Juneau',
  'America/Kentucky/Louisville',
  'America/Kentucky/Monticello',
  'America/Kralendijk',
  'America/La_Paz',
  'America/Lima',
  'America/Los_Angeles',
  'America/Lower_Princes',
  'America/Maceio',
  'America/Managua',
  'America/Manaus',
  'America/Marigot',
  'America/Martinique',
  'America/Matamoros',
  'America/Mazatlan',
  'America/Menominee',
  'America/Merida',
  'America/Metlakatla',
  'America/Mexico_City',
  'America/Miquelon',
  'America/Moncton',
  'America/Monterrey',
  'America/Montevideo',
  'America/Montserrat',
  'America/Nassau',
  'America/New_York',
  'America/Nipigon',
  'America/Nome',
  'America/Noronha',
  'America/North_Dakota/Beulah',
  'America/North_Dakota/Center',
  'America/North_Dakota/New_Salem',
  'America/Ojinaga',
  'America/Panama',
  'America/Pangnirtung',
  'America/Paramaribo',
  'America/Phoenix',
  'America/Port-au-Prince',
  'America/Port_of_Spain',
  'America/Porto_Velho',
  'America/Puerto_Rico',
  'America/Punta_Arenas',
  'America/Rainy_River',
  'America/Rankin_Inlet',
  'America/Recife',
  'America/Regina',
  'America/Resolute',
  'America/Rio_Branco',
  'America/Santarem',
  'America/Santiago',
  'America/Santo_Domingo',
  'America/Sao_Paulo',
  'America/Scoresbysund',
  'America/Sitka',
  'America/St_Barthelemy',
  'America/St_Johns',
  'America/St_Kitts',
  'America/St_Lucia',
  'America/St_Thomas',
  'America/St_Vincent',
  'America/Swift_Current',
  'America/Tegucigalpa',
  'America/Thule',
  'America/Thunder_Bay',
  'America/Tijuana',
  'America/Toronto',
  'America/Tortola',
  'America/Vancouver',
  'America/Whitehorse',
  'America/Winnipeg',
  'America/Yakutat',
  'America/Yellowknife',
  'Antarctica/Casey',
  'Antarctica/Davis',
  'Antarctica/DumontDUrville',
  'Antarctica/Macquarie',
  'Antarctica/Mawson',
  'Antarctica/McMurdo',
  'Antarctica/Palmer',
  'Antarctica/Rothera',
  'Antarctica/Syowa',
  'Antarctica/Troll',
  'Antarctica/Vostok',
  'Arctic/Longyearbyen',
  'Asia/Aden',
  'Asia/Almaty',
  'Asia/Amman',
  'Asia/Anadyr',
  'Asia/Aqtau',
  'Asia/Aqtobe',
  'Asia/Ashgabat',
  'Asia/Atyrau',
  'Asia/Baghdad',
  'Asia/Bahrain',
  'Asia/Baku',
  'Asia/Bangkok',
  'Asia/Barnaul',
  'Asia/Beirut',
  'Asia/Bishkek',
  'Asia/Brunei',
  'Asia/Chita',
  'Asia/Choibalsan',
  'Asia/Colombo',
  'Asia/Damascus',
  'Asia/Dhaka',
  'Asia/Dili',
  'Asia/Dubai',
  'Asia/Dushanbe',
  'Asia/Famagusta',
  'Asia/Gaza',
  'Asia/Hebron',
  'Asia/Ho_Chi_Minh',
  'Asia/Hong_Kong',
  'Asia/Hovd',
  'Asia/Irkutsk',
  'Asia/Jakarta',
  'Asia/Jayapura',
  'Asia/Jerusalem',
  'Asia/Kabul',
  'Asia/Kamchatka',
  'Asia/Karachi',
  'Asia/Kathmandu',
  'Asia/Khandyga',
  'Asia/Kolkata',
  'Asia/Krasnoyarsk',
  'Asia/Kuala_Lumpur',
  'Asia/Kuching',
  'Asia/Kuwait',
  'Asia/Macau',
  'Asia/Magadan',
  'Asia/Makassar',
  'Asia/Manila',
  'Asia/Muscat',
  'Asia/Nicosia',
  'Asia/Novokuznetsk',
  'Asia/Novosibirsk',
  'Asia/Omsk',
  'Asia/Oral',
  'Asia/Phnom_Penh',
  'Asia/Pontianak',
  'Asia/Pyongyang',
  'Asia/Qatar',
  'Asia/Qostanay',
  'Asia/Qyzylorda',
  'Asia/Riyadh',
  'Asia/Sakhalin',
  'Asia/Samarkand',
  'Asia/Seoul',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Srednekolymsk',
  'Asia/Taipei',
  'Asia/Tashkent',
  'Asia/Tbilisi',
  'Asia/Tehran',
  'Asia/Thimphu',
  'Asia/Tokyo',
  'Asia/Tomsk',
  'Asia/Ulaanbaatar',
  'Asia/Urumqi',
  'Asia/Ust-Nera',
  'Asia/Vientiane',
  'Asia/Vladivostok',
  'Asia/Yakutsk',
  'Asia/Yangon',
  'Asia/Yekaterinburg',
  'Asia/Yerevan',
  'Atlantic/Azores',
  'Atlantic/Bermuda',
  'Atlantic/Canary',
  'Atlantic/Cape_Verde',
  'Atlantic/Faroe',
  'Atlantic/Madeira',
  'Atlantic/Reykjavik',
  'Atlantic/South_Georgia',
  'Atlantic/St_Helena',
  'Atlantic/Stanley',
  'Australia/Adelaide',
  'Australia/Brisbane',
  'Australia/Broken_Hill',
  'Australia/Currie',
  'Australia/Darwin',
  'Australia/Eucla',
  'Australia/Hobart',
  'Australia/Lindeman',
  'Australia/Lord_Howe',
  'Australia/Melbourne',
  'Australia/Perth',
  'Australia/Sydney',
  'Europe/Amsterdam',
  'Europe/Andorra',
  'Europe/Astrakhan',
  'Europe/Athens',
  'Europe/Belgrade',
  'Europe/Berlin',
  'Europe/Bratislava',
  'Europe/Brussels',
  'Europe/Bucharest',
  'Europe/Budapest',
  'Europe/Busingen',
  'Europe/Chisinau',
  'Europe/Copenhagen',
  'Europe/Dublin',
  'Europe/Gibraltar',
  'Europe/Guernsey',
  'Europe/Helsinki',
  'Europe/Isle_of_Man',
  'Europe/Istanbul',
  'Europe/Jersey',
  'Europe/Kaliningrad',
  'Europe/Kiev',
  'Europe/Kirov',
  'Europe/Lisbon',
  'Europe/Ljubljana',
  'Europe/London',
  'Europe/Luxembourg',
  'Europe/Madrid',
  'Europe/Malta',
  'Europe/Mariehamn',
  'Europe/Minsk',
  'Europe/Monaco',
  'Europe/Moscow',
  'Europe/Oslo',
  'Europe/Paris',
  'Europe/Podgorica',
  'Europe/Prague',
  'Europe/Riga',
  'Europe/Rome',
  'Europe/Samara',
  'Europe/San_Marino',
  'Europe/Sarajevo',
  'Europe/Saratov',
  'Europe/Simferopol',
  'Europe/Skopje',
  'Europe/Sofia',
  'Europe/Stockholm',
  'Europe/Tallinn',
  'Europe/Tirane',
  'Europe/Ulyanovsk',
  'Europe/Uzhgorod',
  'Europe/Vaduz',
  'Europe/Vatican',
  'Europe/Vienna',
  'Europe/Vilnius',
  'Europe/Volgograd',
  'Europe/Warsaw',
  'Europe/Zagreb',
  'Europe/Zaporozhye',
  'Europe/Zurich',
  'Indian/Antananarivo',
  'Indian/Chagos',
  'Indian/Christmas',
  'Indian/Cocos',
  'Indian/Comoro',
  'Indian/Kerguelen',
  'Indian/Mahe',
  'Indian/Maldives',
  'Indian/Mauritius',
  'Indian/Mayotte',
  'Indian/Reunion',
  'Pacific/Apia',
  'Pacific/Auckland',
  'Pacific/Bougainville',
  'Pacific/Chatham',
  'Pacific/Chuuk',
  'Pacific/Easter',
  'Pacific/Efate',
  'Pacific/Enderbury',
  'Pacific/Fakaofo',
  'Pacific/Fiji',
  'Pacific/Funafuti',
  'Pacific/Galapagos',
  'Pacific/Gambier',
  'Pacific/Guadalcanal',
  'Pacific/Guam',
  'Pacific/Honolulu',
  'Pacific/Kiritimati',
  'Pacific/Kosrae',
  'Pacific/Kwajalein',
  'Pacific/Majuro',
  'Pacific/Marquesas',
  'Pacific/Midway',
  'Pacific/Nauru',
  'Pacific/Niue',
  'Pacific/Norfolk',
  'Pacific/Noumea',
  'Pacific/Pago_Pago',
  'Pacific/Palau',
  'Pacific/Pitcairn',
  'Pacific/Pohnpei',
  'Pacific/Port_Moresby',
  'Pacific/Rarotonga',
  'Pacific/Saipan',
  'Pacific/Tahiti',
  'Pacific/Tarawa',
  'Pacific/Tongatapu',
  'Pacific/Wake',
  'Pacific/Wallis',
  'UTC'
];

export const isRequired = (value: any): boolean => {
  return !_.isUndefined(value);
};

export const isAlpha = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (_.isNull(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return /^[a-zA-Z]*$/.test(value);
};

export const isAlphaDash = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (_.isNull(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return /^[a-zA-Z_-]*$/.test(value);
};

export const isAlphaNum = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (_.isNull(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return /^[a-zA-Z0-9]*$/.test(value);
};

export const isAlphaNumDash = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (_.isNull(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return /^[a-zA-Z0-9_-]*$/.test(value);
};

export const isDigits = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (_.isNull(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return /^[\d]*$/.test(value);
};

export const isTrue = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return value === true;
};

export const isTruthy = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return !!value;
};

export const isFalse = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return value === false;
};

export const isFalsey = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return !value;
};

export const isNull = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return _.isNull(value);
};

export const isNotNull = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return !_.isNull(value);
};

export const isBlank = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (_.isNull(value)) {
    return true;
  }
  return String(value).trim() === '';
};

export const isNotBlank = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (_.isNull(value)) {
    return false;
  }
  return String(value).trim() !== '';
};

export const isEmpty = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (value === '' || value === '0' || _.isNull(value) || value === false || value === 0 || value === 0.0) {
    return true;
  }
  return (_.isObject(value) || _.isArray(value)) && _.isEmpty(value);
};

export const isNotEmpty = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return !isEmpty(value);
};

export const isScalar = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return _.isString(value) || _.isNumber(value) || value === true || value === false;
};

export const isNotScalar = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return !isScalar(value);
};

export const isNumeric = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return !isNaN(Number(value));
};

export const isExactNumber = (value: any, numberStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return Number(value) === Number(numberStr);
};

export const isMinNumber = (value: any, numberStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return Number(value) >= Number(numberStr);
};

export const isMaxNumber = (value: any, numberStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return Number(value) <= Number(numberStr);
};

export const isRangeNumber = (value: any, minNumberStr: any, maxNumberStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return Number(value) >= Number(minNumberStr) && Number(value) <= Number(maxNumberStr);
};

export const isNaturalNumber = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return value > 0 && parseInt(value) == value;
};

export const isWholeNumber = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return value >= 0 && parseInt(value) == value;
};

export const isJson = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
};

export const isEmail = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const isUri = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return /^(?:([^:\/?#]+)(:))?(?:(\/\/)([^\/?#]*))?([^?#]*)(?:(\?)([^#]*))?(?:(#)(.*))?$/.test(value);
};

export const isUrn = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  if (value.substring(0, 8) === 'urn:urn:') {
    return false;
  }
  return /^urn:[a-z0-9](?:[a-z0-9\-]{1,31})?:(?:[a-z0-9()+,\-.:=@;$_!*']|%(?:0[a-f1-9]|[a-f1-9][a-f0-9]))+$/i.test(
    value
  );
};

export const isUuid = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
};

export const isIpV4Address = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
};

export const isIpV6Address = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(
    value
  );
};

export const isIpAddress = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return isIpV4Address(value) || isIpV6Address(value);
};

export const isDate = (value: any, format: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  // skip unusual date/time format checks client-side
  if (format !== 'Y-m-d' && format !== 'm/d/Y') {
    return true;
  }
  if (format === 'Y-m-d') {
    const date = new Date(value);
    return date.toISOString().substring(0, 10) === value;
  }
  const date = new Date(value);
  const year = date.toISOString().substring(0, 4);
  const month = date.toISOString().substring(5, 7);
  const day = date.toISOString().substring(8, 10);
  return month + '/' + day + '/' + year === value;
};

export const isDateTime = (value: any, format: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  // skip unusual date/time format checks client-side
  if (format !== 'Y-m-d H:i:s') {
    return true;
  }
  if (value.length !== 19) {
    return false;
  }
  const year = parseInt(value.substring(0, 4));
  const month = parseInt(value.substring(5, 7)) - 1;
  const day = parseInt(value.substring(8, 10));
  const hour = parseInt(value.substring(11, 13));
  const minute = parseInt(value.substring(14, 16));
  const second = parseInt(value.substring(17, 19));
  const date = new Date(year, month, day, hour, minute, second);
  return date.toISOString().replace('T', ' ') === value;
};

export const isTime = (value: any, format: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  // skip unusual date/time format checks client-side
  if (format !== 'H:i:s') {
    return true;
  }
  if (value.length !== 8) {
    return false;
  }
  const now = new Date().toISOString();
  const year = parseInt(now.substring(0, 4));
  const month = parseInt(now.substring(5, 7)) - 1;
  const day = parseInt(now.substring(8, 10));
  const hour = parseInt(value.substring(0, 2));
  const minute = parseInt(value.substring(3, 5));
  const second = parseInt(value.substring(6, 8));
  const date = new Date(year, month, day, hour, minute, second);
  return date.toISOString().substring(11, 19) === value;
};

export const isTimezone = (value: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return timezones.includes(value);
};

export const hasExactCount = (value: any, countStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  const count = parseInt(countStr);
  if (_.isObject(value)) {
    return _.keys(value).length === count;
  }
  return _.isArray(value) && value.length === count;
};

export const hasMinCount = (value: any, countStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  const count = parseInt(countStr);
  if (_.isObject(value)) {
    return _.keys(value).length >= count;
  }
  return _.isArray(value) && value.length >= count;
};

export const hasMaxCount = (value: any, countStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  const count = parseInt(countStr);
  if (_.isObject(value)) {
    return _.keys(value).length <= count;
  }
  return _.isArray(value) && value.length <= count;
};

export const hasRangeCount = (value: any, minCountStr: any, maxCountStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  const minCount = parseInt(minCountStr);
  const maxCount = parseInt(maxCountStr);
  if (_.isObject(value)) {
    return _.keys(value).length >= minCount && _.keys(value).length <= maxCount;
  }
  return _.isArray(value) && value.length >= minCount && value.length <= maxCount;
};

export const hasExactLength = (value: any, lengthStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  const length = parseInt(lengthStr);
  if (!_.isString(value)) {
    return false;
  }
  return value.length === length;
};

export const hasMinLength = (value: any, lengthStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  const length = parseInt(lengthStr);
  if (!_.isString(value)) {
    return false;
  }
  return value.length >= length;
};

export const hasMaxLength = (value: any, lengthStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  const length = parseInt(lengthStr);
  if (!_.isString(value)) {
    return false;
  }
  return value.length <= length;
};

export const hasRangeLength = (value: any, minLengthStr: any, maxLengthStr: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  const minLength = parseInt(minLengthStr);
  const maxLength = parseInt(maxLengthStr);
  if (!_.isString(value)) {
    return false;
  }
  return value.length >= minLength && value.length <= maxLength;
};

export const inList = (value: any, ...items: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  return items.includes(value);
};

export const keyIsset = (value: any, key: string): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isObject(value)) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return _.has(value, key) && !_.isNull(value[key]);
};

export const keyNotEmpty = (value: any, key: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isObject(value)) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return _.has(value, key) && !isEmpty(value[key]);
};

export const regexMatch = (value: any, regex: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return new RegExp(regex.substring(1, regex.length - 1)).test(value);
};

export const stringContains = (value: any, search: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return value.includes(search);
};

export const stringEndsWith = (value: any, search: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return value.endsWith(search);
};

export const stringStartsWith = (value: any, search: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isString(value)) {
    return false;
  }
  return value.startsWith(search);
};

export const isType = (value: any, type: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  const nullable = type.substring(0, 1) === '?';
  if (_.isNull(value) && nullable) {
    return true;
  }
  type = nullable ? type.substring(1) : type;
  if (type === 'array' || type === 'object') {
    return _.isObject(value) || _.isArray(value);
  }
  if (type === 'bool') {
    return value === true || value === false;
  }
  if (type === 'int') {
    return _.isInteger(value);
  }
  if (type === 'float') {
    return _.isNumber(value);
  }
  if (type === 'string') {
    return _.isString(value);
  }
  return true;
};

export const isListOf = (value: any, type: any): boolean => {
  // skip required check
  if (_.isUndefined(value)) {
    return true;
  }
  if (!_.isArray(value) && !_.isObject(value)) {
    return false;
  }
  return _.every(value, function(item) {
    return isType(item, type);
  });
};

export const areEqual = (value1: any, value2: any): boolean => {
  // skip required check
  if (_.isUndefined(value1)) {
    return true;
  }
  if (_.isUndefined(value2)) {
    return true;
  }
  return value1 == value2;
};

export const areNotEqual = (value1: any, value2: any): boolean => {
  // skip required check
  if (_.isUndefined(value1)) {
    return true;
  }
  if (_.isUndefined(value2)) {
    return true;
  }
  return !areEqual(value1, value2);
};

export const areSame = (value1: any, value2: any): boolean => {
  // skip required check
  if (_.isUndefined(value1)) {
    return true;
  }
  if (_.isUndefined(value2)) {
    return true;
  }
  return value1 === value2;
};

export const areNotSame = (value1: any, value2: any): boolean => {
  // skip required check
  if (_.isUndefined(value1)) {
    return true;
  }
  if (_.isUndefined(value2)) {
    return true;
  }
  return !areSame(value1, value2);
};

export default Object.freeze({
  Alpha: isAlpha,
  AlphaDash: isAlphaDash,
  AlphaNum: isAlphaNum,
  AlphaNumDash: isAlphaNumDash,
  Blank: isBlank,
  Contains: stringContains,
  Date: isDate,
  DateTime: isDateTime,
  Digits: isDigits,
  Email: isEmail,
  Empty: isEmpty,
  EndsWith: stringEndsWith,
  Equals: areEqual,
  ExactCount: hasExactCount,
  ExactLength: hasExactLength,
  ExactNumber: isExactNumber,
  False: isFalse,
  Falsey: isFalsey,
  InList: inList,
  IpAddress: isIpAddress,
  IpV4Address: isIpV4Address,
  IpV6Address: isIpV6Address,
  Json: isJson,
  KeyIsset: keyIsset,
  KeyNotEmpty: keyNotEmpty,
  Match: regexMatch,
  ListOf: isListOf,
  MaxCount: hasMaxCount,
  MaxLength: hasMaxLength,
  MaxNumber: isMaxNumber,
  MinCount: hasMinCount,
  MinLength: hasMinLength,
  MinNumber: isMinNumber,
  NaturalNumber: isNaturalNumber,
  NotBlank: isNotBlank,
  NotEmpty: isNotEmpty,
  NotEquals: areNotEqual,
  NotNull: isNotNull,
  NotSame: areNotSame,
  NotScalar: isNotScalar,
  Null: isNull,
  Numeric: isNumeric,
  RangeCount: hasRangeCount,
  RangeLength: hasRangeLength,
  RangeNumber: isRangeNumber,
  Required: isRequired,
  Same: areSame,
  Scalar: isScalar,
  StartsWith: stringStartsWith,
  Time: isTime,
  Timezone: isTimezone,
  True: isTrue,
  Truthy: isTruthy,
  Type: isType,
  Uri: isUri,
  Urn: isUrn,
  Uuid: isUuid,
  WholeNumber: isWholeNumber
});
