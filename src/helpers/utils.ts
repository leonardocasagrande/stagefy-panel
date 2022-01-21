import { getIn } from 'formik';

const getErrorByKey = (key: string, touched: any, errors: any) => {
  const touch = getIn(touched, key);
  if (!touch) return null;
  const err = getIn(errors, key);
  if (!err) return null;
  return err;
};

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
};

function stringAvatar(name: string) {
  const splitName = name.split(' ');
  let initials = splitName[0][0];
  if (splitName.length > 1) {
    initials += splitName[splitName.length - 1][0];
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: 32,
    },
    children: initials,
  };
}

export { getErrorByKey, stringToColor, stringAvatar };
