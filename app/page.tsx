import { Skeleton } from "@/components/ui/skeleton";

export default async function Home() {
    return (
        <div>
            <Skeleton className='h-[500px] w-full rounded-md' color="rosa" />
        </div>
    )
}
