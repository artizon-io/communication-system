import React from 'react';
import { useState } from 'react';
import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  Icon3dCubeSphere,
  IconUserCircle,
  IconCloud,
  IconUsers,
  IconMessages,
  IconMessage
} from '@tabler/icons';
import * as Mantine from '@mantine/core';


const useStyles = Mantine.createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const NavbarLink = ({ icon: Icon, label, active, onClick }: NavbarLinkProps) => {
  const { classes, cx } = useStyles();
  return (
    <Mantine.Tooltip label={label} position="right" transitionDuration={0}>
      <Mantine.UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon stroke={1.5} />
      </Mantine.UnstyledButton>
    </Mantine.Tooltip>
  );
}

const mockdata = [
  // { icon: IconHome2, label: 'Home' },
  // { icon: IconGauge, label: 'Dashboard' },
  
  { icon: IconMessages, label: 'Group Chat' },
  { icon: IconMessage, label: 'Direct Message' },
  { icon: IconCalendarStats, label: 'Events' },
  { icon: IconCloud, label: 'Cloud Storage' },
];

export const Navbar : React.FC<Omit<React.ComponentProps<typeof Mantine.Navbar>, 'children'>> = ({ ...props }) => {
  const [active, setActive] = useState(0);

  return (
    <Mantine.Navbar width={{ base: 80 }} p="md" {...props}>
      {/* <Mantine.Center style={{
        borderRadius: '50%',
        backgroundColor: '#0c63a1',
        width: 'calc(50px - 5px * 2)',
        height: 'calc(50px - 5px * 2)',
        margin: '5px'
      }}>
        <Icon3dCubeSphere stroke={1.5} color={'#ffffff'} />
      </Mantine.Center> */}
      <Mantine.Navbar.Section grow>
        <Mantine.Stack justify="center" spacing={10}>
        {mockdata.map((link, index) => (
          <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
          />
        ))}
        </Mantine.Stack>
      </Mantine.Navbar.Section>
      <Mantine.Navbar.Section>
        <Mantine.Stack justify="center" spacing={10}>
          <NavbarLink icon={IconUserCircle} label="Account" />
          <NavbarLink icon={IconSettings} label="Settings" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Mantine.Stack>
      </Mantine.Navbar.Section>
    </Mantine.Navbar>
  );
}