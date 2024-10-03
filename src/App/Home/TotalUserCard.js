import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FetchUserLists from '../UserLists/UserListApi';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    backgroundImage: 'url(/userimage.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    minWidth: '100%',
    minHeight: '230px',
    color: '#fff',
}));

export default function TotalUserCard() {
    const { users } = FetchUserLists();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/userlist');
    };

    return (
        <StyledCard>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(0, 0, 0, 0.5)' }}>
               <div>
                <PeopleOutlineIcon />
                <Typography variant="h5">
                    Total User Counts: {users.length}
                </Typography>
                </div>
                <Button size="small" onClick={handleNavigate} variant="contained" >
                    User List Details
                </Button>
            </CardContent>

        </StyledCard>
    );
}
