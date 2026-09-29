import Blog01 from "@/components/blog-01";
import { TextAnimate } from "@/components/ui/text-animate";

export default function BlogsPage() {
    return (
        <div className="min-h-svh w-full bg-[#271b15]">
            <section className="w-full h-full mt-20">
                <div className="h-full w-full flex px-4 sm:px-8 py-6 sm:py-8 lg:py-10">
                    <div className="w-full h-full flex flex-col gap-3 sm:gap-4">
                        <TextAnimate animation="slideLeft" by="character" as="h1" className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm">
                            BLOGS
                        </TextAnimate>
                        <TextAnimate
                            animation="slideLeft"
                            as="p"
                            className="-mt-2 text-sm sm:text-base text-gray-300 max-w-2xl"
                        >
                            Stories from the wild
                        </TextAnimate>
                    </div>
                </div>
                <Blog01 />
            </section>
        </div>
    )
}
