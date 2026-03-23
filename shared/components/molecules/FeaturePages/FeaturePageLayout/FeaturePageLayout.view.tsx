import ProductNav from '@/components/ProductNav/ProductNav'
import { FeaturePageLayoutProps } from './FeaturePageLayout.types'

const FeaturePageLayout: React.FC<FeaturePageLayoutProps> = ({
  children,
  showProductNav = true,
}) => {
  return (
    <main className="!mt-[-10px] mb-auto">
      {showProductNav && <ProductNav />}

      <div className="relative bg-signoz_ink-500">
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

        {children}
      </div>
    </main>
  )
}

export default FeaturePageLayout
