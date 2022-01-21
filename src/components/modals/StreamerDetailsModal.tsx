import { Avatar, Stack, Typography } from '@mui/material';
import { stringAvatar } from 'helpers/utils';
import { IProfessional } from 'types';
import Modal from './Modal';

interface IStreamerDetailsModalProps {
  professional: IProfessional;
  open: boolean;
  onClose: () => void;
}

const StreamerDetailsModal = ({
  professional,
  open,
  onClose,
}: IStreamerDetailsModalProps) => {
  const avatarProps = professional.user.avatar
    ? {
        src: professional.user.avatar,
        sx: {
          width: 190,
          height: 190,
        },
      }
    : { ...stringAvatar(professional.user.name) };
  avatarProps.sx = { ...avatarProps.sx, width: 190, height: 190 };
  return (
    <Modal open={open} onClose={onClose}>
      <Stack direction="row" spacing={4}>
        <Avatar {...avatarProps} />
        <Stack direction="column" spacing={4}>
          <Typography variant="h2">{professional.user.name}</Typography>
          <Stack direction="column" spacing={3}>
            <Typography variant="h6">sobre</Typography>
            <Typography>{professional.bio}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default StreamerDetailsModal;
