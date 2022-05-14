import { User } from 'run-and-drive-lib/models';

const oleksandrUser: User = {
  id: 'first',
  name: 'Oleksand',
  surname: 'Danylchenko',
  email: 'oleksa@gmail.com',
  photoUrl: 'https://i.kym-cdn.com/photos/images/original/001/250/216/305.jpg',
};

export const users: User[] = new Array(40).fill(true).map(() => oleksandrUser);
