import { Typography } from 'antd'

import { FeatureProps, IPricingPlanItem } from '@/interfaces'

const { Title, Text } = Typography

type PricingPlanProps = {
  pricingPlanItem: IPricingPlanItem
}

export const CardPricingPlan: React.FC<PricingPlanProps> = ({ pricingPlanItem }) => {
  return (
    <li className='flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white'>
      <Title level={3} className='mb-4 text-2xl font-semibold'>{pricingPlanItem.title}</Title>
      <span className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>{pricingPlanItem.description}</span>
      <div className='flex justify-center items-baseline my-8'>
        <Text className='mr-2 text-5xl font-extrabold'>{pricingPlanItem.price}</Text>
        <Text className='text-gray-500 dark:text-gray-400'>/month</Text>
      </div>

      <ul role='list' className='mb-8 space-y-4 text-left'>
        {pricingPlanItem.features?.map((feature: FeatureProps) => (
          <li className='flex items-center space-x-3' key={feature.text}>
            <span className='text-lg text-green-500'>{feature.icon}</span>
            <span className='text-base'>{feature.text}</span>
          </li>
        ))}
      </ul>
    </li>
  )
}
