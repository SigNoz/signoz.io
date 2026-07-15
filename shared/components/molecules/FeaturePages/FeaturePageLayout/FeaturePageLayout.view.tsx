import ProductNav from '@/components/ProductNav/ProductNav'
import { cn } from 'app/lib/utils'
import { FeaturePageLayoutProps } from './FeaturePageLayout.types'

const FeaturePageLayout: React.FC<FeaturePageLayoutProps> = ({
  children,
  showProductNav = true,
  fullWidth = false,
}) => {
  return (
    <main className={cn('relative mx-auto !mt-[-10px] mb-auto', !fullWidth && 'max-w-8xl')}>
      {showProductNav && <ProductNav />}

      <div className="bg-background relative">
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute top-0 right-0 left-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

        {children}
      </div>
    </main>
  )
}

export default FeaturePageLayout
