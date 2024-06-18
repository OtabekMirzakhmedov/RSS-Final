export enum RoutesPages {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/create-account',
  PROFILE = '/profile',
  CATALOG = '/catalog',
  GATEGORY = '/catalog/:categoryName',
  PRODUCT = '/product/:productId',
  NOTFOUND = '*',
  ABOUT = '/about',
  BASKET = '/basket',
}

export enum Categories {
  biography = 'b4a1ad52-de5b-415a-90e0-067a578949d2',
  fiction = 'adb2b344-806b-4079-ae69-e1235bc66775',
}

export enum ResponseCheck {
  NotRegistered = 'This email is not registered',
  WrongPassword = 'Wrong password',
}
