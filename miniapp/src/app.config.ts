export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/tips/index',
    'pages/insights/index',
    'pages/profile/index',
  ],
  window: {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
  },
  tabBar: {
    color: '#a0a0b8',
    selectedColor: '#af90e8',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      { pagePath: 'pages/home/index', text: '首页', iconPath: 'assets/home.png', selectedIconPath: 'assets/home-active.png' },
      { pagePath: 'pages/tips/index', text: '指引', iconPath: 'assets/tips.png', selectedIconPath: 'assets/tips-active.png' },
      { pagePath: 'pages/insights/index', text: '日历', iconPath: 'assets/calendar.png', selectedIconPath: 'assets/calendar-active.png' },
      { pagePath: 'pages/profile/index', text: '我的', iconPath: 'assets/profile.png', selectedIconPath: 'assets/profile-active.png' },
    ],
  },
});
