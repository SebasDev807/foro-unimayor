import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUsersRankedByLikes } from "@/prisma/queries"
import  {TrendingList}  from "@/components/trending-list"
import { StickyWrapper } from "@/components/sticky-wrapper"

export default async function Component() {
  const rankedUsers = await getUsersRankedByLikes()

  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-bold text-center mb-6">Ranking Mensual</h2>
        <div className="flex justify-center items-end mb-12">
          {[2, 0, 1].map((index) => {
            const user = rankedUsers[index]
            if (!user) return null
            return (
              <div key={index} className={`flex flex-col items-center mx-2 ${index === 0 ? 'mb-8' : ''}`}>
                <Avatar className="w-16 h-16 mb-2">
                  <AvatarImage src={user.profileImage || undefined} />
                  <AvatarFallback>{user.name?.charAt(0) || user.username?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div
                  className={`w-20 h-${
                    index === 0 ? '32' : '24'
                  } flex items-end justify-center text-4xl font-bold text-white ${
                    index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-red-400' : 'bg-blue-400'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-center">
                  <div className="font-semibold">{user.name || user.username}</div>
                  <div className="text-sm text-gray-500">{user.totalLikes} likes</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="max-w-md mx-auto space-y-2">
          {rankedUsers.slice(3).map((user, index) => (
            <div key={index} className="flex items-center bg-white p-2 rounded-lg shadow-sm">
              <span className="text-lg font-semibold w-8 text-center">{index + 4}</span>
              <Avatar className="w-10 h-10 mx-2">
                <AvatarImage src={user.profileImage || undefined} />
                <AvatarFallback>{user.name?.charAt(0) || user.username?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="font-semibold text-sm">{user.name || user.username}</div>
                <div className="text-xs text-gray-500">{user.totalLikes} likes</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <StickyWrapper>
          <TrendingList />
        </StickyWrapper>
      </div>
    </div>
  )
}