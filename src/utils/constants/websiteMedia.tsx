import { icons } from '@/utils/icons'

export const FEATURES = [
  {
    title: 'Enhanced Security',
    text: 'Keep your passwords safe with encryption.',
    icon: icons.safety
  },
  {
    title: 'Easy Sharing',
    text: 'Securely share credentials with your team members.',
    icon: icons.userSwitch
  },
  {
    title: 'Cloud Sync',
    text: 'Access your passwords from anywhere, anytime.',
    icon: icons.cloud
  },
  {
    title: 'Secure Backup',
    text: 'Never lose your data with our automated backup.',
    icon: icons.lock
  },
  {
    title: 'Custom Integrations',
    text: 'Integrate with other tools to enhance your workflow.',
    icon: icons.tool
  },
  {
    title: 'Activity Monitoring',
    text: 'Track all activities to prevent unauthorized access.',
    icon: icons.antDashboard
  }
]

export const PRICING_PLAN_ITEMS = [
  {
    title: 'Free',
    description: 'Get started and try our service before pricing',
    price: '$0',
    features: [
      {
        icon: icons.checkmark,
        text: 'Save account'
      },
      {
        icon: icons.checkmark,
        text: 'Limited workspace'
      }
    ]
  },
  {
    title: 'Starter',
    description: 'Best option for personal use and small projects.',
    price: '$19',
    features: [
      {
        icon: icons.checkmark,
        text: 'Basic configuration'
      },
      {
        icon: icons.checkmark,
        text: 'No setup or hidden fees'
      },
      {
        icon: icons.checkmark,
        text: 'Email support'
      }
    ]
  },
  {
    title: 'Professional',
    description: 'Ideal for freelancers and growing businesses.',
    price: '$49',
    features: [
      {
        icon: icons.checkmark,
        text: 'Advanced configuration'
      },
      {
        icon: icons.checkmark,
        text: 'Priority support'
      },
      {
        icon: icons.checkmark,
        text: 'Free updates'
      }
    ]
  },
  {
    title: 'Business',
    description: 'Perfect for small to medium-sized teams.',
    price: '$99',
    features: [
      {
        icon: icons.checkmark,
        text: 'Team collaboration tools'
      },
      {
        icon: icons.checkmark,
        text: 'Premium support'
      },
      {
        icon: icons.checkmark,
        text: 'Customizable features'
      }
    ]
  }
]

export const SERVICES_LINKS = [
  {
    title: 'Key FEATURES',
    links: [
      'Securely store login information',
      'Auto-fill passwords',
      'User information security',
      'Easy account management',
      'Remember account information across multiple devices',
      'Organize information by categories',
      'Securely share information',
      'Account usage statistics',
      'Update and sync information',
      '24/7 customer support'
    ]
  },
  {
    title: 'Others',
    links: [
      'About Us',
      'Careers',
      'Contact Us',
      'Security Solutions',
      'Technology Innovation',
      'Our Activities',
      'Partnerships',
      'Blog'
    ]
  }
]

export const SOCIAL_MEDIA = [
  {
    href: '#facebook',
    icon: icons.facebook
  },
  {
    href: '#twitter',
    icon: icons.twitter
  },
  {
    href: '#instagram',
    icon: icons.instagram
  },
  {
    href: '#linkedin',
    icon: icons.linkedin
  }
]
