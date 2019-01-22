export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'

  },
  /*,
  {
    title: true,
    name: 'Theme'
  },*/
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Logs',
    url: '/logs',
    icon: 'fa fa-code',
    /* children: [
      {
        name: 'Text Editors',
        url: '/editors/text-editors',
        icon: 'icon-note',
        badge: {
          variant: 'danger',
          text: 'PRO'
        }
      },
      {
        name: 'Code Editors',
        url: '/editors/code-editors',
        icon: 'fa fa-code',
        badge: {
          variant: 'danger',
          text: 'PRO'
        }
      }
    ] */
  },
  /* {
    name: 'Forms',
    url: '/forms',
    icon: 'icon-note',
    children: [
      {
        name: 'Basic Forms',
        url: '/forms/basic-forms',
        icon: 'icon-note'
      },
      {
        name: 'Advanced',
        url: '/forms/advanced-forms',
        icon: 'icon-note',
        badge: {
          variant: 'danger',
          text: 'PRO'
        }
      },
      {
        name: 'Validation',
        url: '/forms/validation-forms',
        icon: 'icon-note',
        badge: {
          variant: 'danger',
          text: 'PRO'
        }
      },
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  }, */
  {
    name: 'Statistics',
    url: '/stat',
    icon: 'icon-pie-chart',
    children: [
      {
        name: 'Instruments',
        url: '/stat/symbols',
        icon: 'icon-chart',
      },
      {
        name: 'Capital',
        url: '/stat/capital',
        icon: 'icon-pie-chart',
      }
    ]
  },
  {
    name: 'News',
    url: '/news',
    icon: 'icon-energy',
    children: [
      {
        name: 'All News',
        url: '/news/calendar',
        icon: 'icon-calendar',
      }
    ]
  },
  {
    name: 'Tables',
    url: '/tables',
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Wallets',
        url: '/tables/wallets',
        icon: 'icon-wallet'
      },
      {
        name: 'Jobs',
        url: '/tables/jobs',
        icon: 'icon-settings'
      },
      {
        name: 'Terminals',
        url: '/tables/terminals',
        icon: 'icon-screen-desktop'
      },
      {
        name: 'Deals',
        url: '/tables/deals',
        icon: 'icon-graph'
      },
      {
        name: 'Experts',
        url: '/tables/experts',
        icon: 'icon-settings'
      },
      {
        name: 'Tables Summary',
        url: '/tables/tables',
        icon: 'icon-list'
      },
    ]
  }
];
