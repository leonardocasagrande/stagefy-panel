import { Avatar, Box, Button, Card, Stack, Typography } from '@mui/material';
import { stringAvatar } from 'helpers/utils';
import { useState } from 'react';
import { IProfessional } from 'types';
import ConfirmationModal from './modals/ConfirmationModal';
import StreamerDetailsModal from './modals/StreamerDetailsModal';

interface IAcceptStreamerCardProps {
  professional: IProfessional;
  onAccept: (id: string) => void;
  onRefuse: (id: string) => void;
}

const AcceptStreamerCard = ({
  professional,
  onAccept,
  onRefuse,
}: IAcceptStreamerCardProps) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [openAccept, setOpenAccept] = useState(false);
  const [openRefuse, setOpenRefuse] = useState(false);

  const handleStreamerAccept = () => {
    setOpenAccept(false);
    onAccept(professional.user.id);
  };
  const handleStreamerRefuse = async () => {
    setOpenRefuse(false);
    onRefuse(professional.user.id);
  };

  const avatarProps = professional.user.avatar
    ? {
        src: professional.user.avatar,
        sx: {
          width: 120,
          height: 120,
        },
      }
    : { ...stringAvatar(professional.user.name) };
  avatarProps.sx = { ...avatarProps.sx, width: 120, height: 120 };
  return (
    <Card sx={{ maxWidth: 250 }}>
      <Stack direction="column" p={2} spacing={3} alignItems="center">
        <Avatar {...avatarProps} />
        <Typography align="center" variant="h3">
          {professional.user.name}
        </Typography>
        <Button onClick={() => setOpenDetails(true)} color="secondary">
          ver resumo
        </Button>
        <Box mt={1} display="flex" gap={1.5}>
          <Button
            onClick={() => setOpenAccept(true)}
            sx={{ width: 90 }}
            color="success"
            variant="contained"
          >
            Aceitar
          </Button>
          <Button
            onClick={() => setOpenRefuse(true)}
            sx={{ width: 90 }}
            color="error"
            variant="contained"
          >
            Recusar
          </Button>
        </Box>
      </Stack>
      <StreamerDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        professional={professional}
      />
      <ConfirmationModal
        open={openAccept}
        description="Você deseja mesmo aceitar esse streamer?"
        title="Aceitar streamer"
        onAccept={handleStreamerAccept}
        onClose={() => setOpenAccept(false)}
        primaryButtonText="Aceitar"
        primaryButtonColor="warning"
      />
      <ConfirmationModal
        open={openRefuse}
        description="Você deseja mesmo recusar esse streamer?"
        title="Recusar streamer"
        onAccept={handleStreamerRefuse}
        onClose={() => setOpenRefuse(false)}
        primaryButtonText="Recusar"
        primaryButtonColor="warning"
      />
    </Card>
  );
};

export default AcceptStreamerCard;
