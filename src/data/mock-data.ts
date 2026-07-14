import type { DreamPost, DreamMessage, DreamComment, User, PostType, ChatSession } from '@/types';

type RawPost = Omit<DreamPost, 'postType'> & { postType?: PostType };

const rawPosts: RawPost[] = [
  {
    id: '1',
    author: { nickname: '织女星', constellation: '处女座' },
    mood: 'chasing',
    content: '我想辞掉工作去学插画。每天对着电脑做着不喜欢的事情，总觉得生活少了点什么。看到别人用画笔描绘出内心的世界，真的很羡慕。今年30岁了，不知道现在开始还晚不晚。',
    images: [],
    hasJourney: false,
    likes: 128,
    collects: 32,
    comments: 15,
    createdAt: '2026-07-12T10:30:00Z',
  },
  {
    id: '2',
    author: { nickname: '北极星', constellation: '金牛座' },
    mood: 'chasing',
    content: '想攒够钱在海边开一家小书店。不需要太大，有落地窗，有咖啡香，有我喜欢的书。每天看着海浪，听着风声，给来的人推荐一本好书。这个想法在我心里藏了五年了。',
    images: [],
    hasJourney: true,
    journey: [
      { timestamp: '2021-05', title: '第一次萌生想法', description: '去厦门旅游时看到一家海边书店，从此念念不忘' },
      { timestamp: '2022-10', title: '开始存钱计划', description: '每月存下工资的60%，戒掉不必要的消费' },
      { timestamp: '2024-03', title: '学习咖啡制作', description: '周末去咖啡馆兼职，学习做咖啡' },
      { timestamp: '2026-07', title: '目标达成一半', description: '已经存够了一半的启动资金，继续加油' },
    ],
    likes: 256,
    collects: 89,
    comments: 8,
    createdAt: '2026-07-11T14:20:00Z',
  },
  {
    id: '3',
    author: { nickname: '天狼星', constellation: '天秤座' },
    mood: 'living',
    content: '我在大理开了三年咖啡馆，这是我的故事。三年前，我还是一个每天加班到深夜的程序员。有一天突然觉得，这不是我想要的生活。于是我辞职，带着所有积蓄来到了大理。',
    images: [],
    hasJourney: true,
    journey: [
      { timestamp: '2023-03', title: '辞职出发', description: '卖掉了城市里的房子，带着两只猫来到大理', advice: '如果你也想做类似的决定，一定要存够至少一年的生活费' },
      { timestamp: '2023-06', title: '找到店面', description: '在古城边上租下了一个小院子，开始装修' },
      { timestamp: '2023-10', title: '咖啡馆开业', description: '第一天营业只有三个客人，但我很开心' },
      { timestamp: '2026-07', title: '三年后', description: '现在咖啡馆已经成为很多旅人歇脚的地方', advice: '坚持做自己喜欢的事情，时间会给你答案' },
    ],
    likes: 512,
    collects: 215,
    comments: 7,
    createdAt: '2026-07-10T09:00:00Z',
  },
  {
    id: '4',
    author: { nickname: '仙女座', constellation: '双鱼座' },
    mood: 'living',
    content: '我实现了环游世界的梦想！用了两年时间，走过了30个国家。从最初的忐忑不安，到后来的从容自在。在路上，我遇到了很多有趣的人，听到了很多动人的故事。',
    images: [],
    hasJourney: true,
    journey: [
      { timestamp: '2024-06', title: '第一次背包旅行', description: '从东南亚开始，预算有限但收获满满' },
      { timestamp: '2024-12', title: '欧洲之旅', description: '冬天的阿尔卑斯山，美得像童话世界' },
      { timestamp: '2025-06', title: '南美探险', description: '在秘鲁看到了马丘比丘，震撼到说不出话' },
      { timestamp: '2026-06', title: '回到家乡', description: '旅行结束，但心里已经装下了整个世界' },
    ],
    likes: 892,
    collects: 342,
    comments: 5,
    createdAt: '2026-07-09T16:45:00Z',
  },
  {
    id: '5',
    author: { nickname: '流星雨', constellation: '巨蟹座' },
    mood: 'daily',
    content: '今天下班路上看到夕阳，突然觉得日子也挺好的。虽然工作很累，虽然还有很多烦恼，但那一刻，夕阳把天空染成了橘红色，很美。生活中的小确幸，大概就是这样吧。',
    images: [],
    hasJourney: false,
    likes: 445,
    collects: 87,
    comments: 4,
    createdAt: '2026-07-12T18:30:00Z',
  },
  {
    id: '6',
    author: { nickname: '晨曦', constellation: '双子座' },
    mood: 'daily',
    content: '今天给自己做了一顿饭。简单的番茄炒蛋，加一碗米饭。坐在阳台上慢慢吃，听着楼下的鸟叫声。好久没有这么悠闲地吃一顿饭了，感觉心里很平静。',
    images: [],
    hasJourney: false,
    likes: 234,
    collects: 56,
    comments: 2,
    createdAt: '2026-07-11T08:15:00Z',
  },
  {
    id: '7',
    author: { nickname: '银河', constellation: '白羊座' },
    mood: 'daily',
    content: '周末去公园散步，看到一只小猫在晒太阳。它伸了个懒腰，然后打了个哈欠，好可爱。蹲下来陪它玩了一会儿，心情瞬间变好。有时候治愈很简单，一只小动物就够了。',
    images: [],
    hasJourney: false,
    likes: 678,
    collects: 123,
    comments: 3,
    createdAt: '2026-07-10T15:00:00Z',
  },
  {
    id: '8',
    author: { nickname: '星尘', constellation: '天蝎座' },
    mood: 'venting',
    content: '加班到11点，外卖凉了，但还是得吃完。回到家已经12点了，连洗澡的力气都没有。第二天还要早起，这日子什么时候是个头啊。',
    images: [],
    hasJourney: false,
    likes: 891,
    collects: 45,
    comments: 3,
    createdAt: '2026-07-12T23:30:00Z',
  },
  {
    id: '9',
    author: { nickname: '极光', constellation: '狮子座' },
    mood: 'venting',
    content: '今天被老板骂了一顿，明明不是我的错。在会议室里当着所有人的面，一点面子都不给。当时眼泪差点掉下来，还是忍住了。成年人的世界，连哭都要选时间和地点。',
    images: [],
    hasJourney: false,
    likes: 567,
    collects: 34,
    comments: 2,
    createdAt: '2026-07-11T17:20:00Z',
  },
  {
    id: '10',
    author: { nickname: '月蚀', constellation: '摩羯座' },
    mood: 'lost',
    content: '25岁了还不知道自己想做什么。看着身边的朋友都有了明确的目标，有的在创业，有的在考研，有的已经结婚生子。而我还在原地打转，不知道未来在哪里。',
    images: [],
    hasJourney: false,
    likes: 1023,
    collects: 189,
    comments: 3,
    createdAt: '2026-07-12T22:00:00Z',
  },
  {
    id: '11',
    author: { nickname: '星夜', constellation: '水瓶座' },
    mood: 'lost',
    content: '分手了。在一起三年，说散就散。现在一个人坐在空荡荡的房间里，不知道该做什么。以后的路要一个人走了，有点害怕，但也有点期待。',
    images: [],
    hasJourney: false,
    likes: 756,
    collects: 98,
    comments: 2,
    createdAt: '2026-07-11T20:45:00Z',
  },
  {
    id: '12',
    author: { nickname: '温暖的星辰', constellation: '射手座' },
    mood: 'healing',
    content: '想告诉每一个正在努力的人：你已经在路上了。不要着急，不要焦虑，你所做的每一点努力，都在铺就你未来的路。相信自己，你比想象中更强大。',
    images: [],
    hasJourney: false,
    likes: 1534,
    collects: 456,
    comments: 3,
    createdAt: '2026-07-10T06:00:00Z',
  },
  {
    id: '13',
    author: { nickname: '梦幻的星云', constellation: '双鱼座' },
    mood: 'healing',
    content: '今天看到一段话："人生没有白走的路，每一步都算数。" 送给正在迷茫中的你。无论现在的你经历着什么，请相信，这都是你人生中不可或缺的一部分。',
    images: [],
    hasJourney: false,
    likes: 1234,
    collects: 321,
    comments: 2,
    createdAt: '2026-07-09T10:30:00Z',
  },
  {
    id: '14',
    author: { nickname: '深邃的星空', constellation: '天蝎座' },
    mood: 'chasing',
    content: '我想成为一名自由作家。每天写自己想写的故事，不用看别人的脸色，不用应付复杂的人际关系。虽然这条路很难，但我想试试。',
    images: [],
    hasJourney: true,
    journey: [
      { timestamp: '2026-01', title: '开始写作', description: '每天写500字，不管写得好不好' },
      { timestamp: '2026-04', title: '第一篇文章发表', description: '在一个公众号上发表了第一篇文章' },
      { timestamp: '2026-07', title: '继续努力', description: '已经写了20篇文章，慢慢找到自己的风格' },
    ],
    likes: 345,
    collects: 78,
    comments: 1,
    createdAt: '2026-07-12T09:00:00Z',
  },
  {
    id: '15',
    author: { nickname: '朦胧的月光', constellation: '巨蟹座' },
    mood: 'living',
    content: '我终于养了一只猫！从小就喜欢猫，但一直没有机会养。现在有了自己的小窝，终于实现了这个小小的梦想。它叫汤圆，是一只橘猫，很粘人，每天回家都有它在门口等我。',
    images: [],
    hasJourney: false,
    likes: 876,
    collects: 156,
    comments: 2,
    createdAt: '2026-07-11T21:00:00Z',
  },
  {
    id: '16',
    author: { nickname: '闪耀的金星', constellation: '狮子座' },
    mood: 'chasing',
    content: '计划明年去留学，现在正在准备语言考试。每天背单词背到想吐，但是想到能去心仪的学校，又充满了动力。加油！',
    images: [],
    hasJourney: true,
    journey: [
      { timestamp: '2026-05', title: '确定目标', description: '申请了英国的几所大学' },
      { timestamp: '2026-07', title: '备考中', description: '每天学习8小时，周末也不休息' },
    ],
    likes: 289,
    collects: 67,
    comments: 1,
    createdAt: '2026-07-12T14:00:00Z',
  },
  {
    id: '17',
    author: { nickname: '神秘的黑洞', constellation: '摩羯座' },
    mood: 'venting',
    content: '父母总是拿我和别人家的孩子比较，真的很累。为什么就不能接受我就是我呢？',
    images: [],
    hasJourney: false,
    likes: 456,
    collects: 23,
    comments: 1,
    createdAt: '2026-07-12T19:30:00Z',
  },
  {
    id: '18',
    author: { nickname: '灿烂的星河', constellation: '双子座' },
    mood: 'daily',
    content: '今天去看了一场电影，很久没有这么放松过了。电影很好看，爆米花很好吃，心情很好。简单的快乐，真好。',
    images: [],
    hasJourney: false,
    likes: 198,
    collects: 45,
    comments: 1,
    createdAt: '2026-07-11T13:00:00Z',
  },
  {
    id: '19',
    author: { nickname: '深邃的星海', constellation: '天秤座' },
    mood: 'healing',
    postType: 'article',
    title: '我在30岁这年，学会了和迷茫和解',
    content: `三十岁生日那天，我一个人坐在出租屋的阳台上，看着城市的灯火通明，突然感到前所未有的迷茫。

朋友们陆续结婚生子、升职加薪，而我似乎还在原地踏步。那份曾经热爱的工作变得索然无味，那些曾经亲密的朋友渐行渐远，连自己曾经坚信的东西也开始动摇。

我开始失眠，开始焦虑，开始怀疑自己是不是走错了路。

直到有一天，我在公园遇到一位老人。他坐在长椅上喂鸽子，神情安详。我忍不住坐到他旁边，问了一个困扰我很久的问题：

"您觉得人生的意义是什么？"

他笑了笑，说："年轻人，人生没有标准答案。就像这些鸽子，有的飞得高，有的飞得低，但它们都在飞。重要的不是飞多高，而是你还在飞。"

那一刻，我突然释然了。

迷茫不是错，它是成长的副产品。当你开始迷茫，说明你开始思考了，开始不满足于现状了。这不是坏事。

从那以后，我学会了和迷茫相处。不再焦虑于"应该怎样"，而是专注于"想要怎样"。我开始学画画，虽然画得很烂；我开始写日记，记录每天的小确幸；我开始一个人旅行，去陌生的城市走走停停。

生活没有变得更好，但我变得更好了。

如果你也正处在迷茫中，别怕。这不是终点，而是新的起点。允许自己迷茫，允许自己慢一点，允许自己走弯路。

因为，每个人的人生节奏都不一样。你的三十岁，不必和任何人一样。`,
    images: [],
    hasJourney: false,
    likes: 892,
    collects: 356,
    comments: 3,
    createdAt: '2026-07-10T09:00:00Z',
  },
  {
    id: '20',
    author: { nickname: '孤独的行星', constellation: '水瓶座' },
    mood: 'lost',
    postType: 'article',
    title: '在大城市漂泊三年，我想和你说些心里话',
    content: `三年前，我拎着一个行李箱来到这座城市。那时候身上只有五千块钱，租了一个地下室，开始了我所谓的"北漂"生活。

第一年是最难熬的。工作不顺，房租占了大半工资，每天挤两个小时的地铁。最难的是孤独——那种身处人群却无人诉说的孤独。

我无数次想过放弃，想过回老家。但每次打开手机看到父母的期待，又把到嘴边的话咽了回去。

第二年，情况慢慢好转。换了一份更好的工作，搬出了地下室，交到了几个真心的朋友。原来这座城市也会对努力的人温柔以待。

第三年，我终于有了自己的小窝，虽然只是租来的小单间，但布置得温馨舒适。我开始享受独处，享受这座城市给我的自由和可能。

回首这三年，我想和正在漂泊的你说：

1. 不要和别人比节奏。有人三年买房，有人十年还在租房子，但这都不重要。重要的是你还在前行。

2. 允许自己偶尔脆弱。在大城市打拼，哭一场不丢人。重要的是哭完之后还能站起来。

3. 存一笔"逃离基金"。哪怕每月只存几百块，当你想离开时，至少有选择的底气。

4. 珍惜每一个真心对你的人。在大城市，真心比什么都珍贵。

5. 别忘了联系家人。他们是你最坚实的后盾，哪怕只是报个平安。

漂泊不易，但请相信，你走过的每一步都算数。愿我们都能在这座城市找到属于自己的位置。`,
    images: [],
    hasJourney: false,
    likes: 1245,
    collects: 678,
    comments: 3,
    createdAt: '2026-07-09T14:30:00Z',
  },
  {
    id: '21',
    author: { nickname: '温柔的月光', constellation: '巨蟹座' },
    mood: 'healing',
    postType: 'article',
    title: '写给每一个"不够好"的你',
    content: `你总觉得自己不够好。

不够漂亮，不够聪明，不够成功，不够讨人喜欢。你看着朋友圈里别人的光鲜生活，再看看自己平凡的日子，心里难免会有落差。

可是亲爱的，你知道吗？

你不需要"够好"。

那些看起来光鲜的人，也有他们的烦恼。那个晒旅行的朋友，可能刚经历了一场失恋；那个晒升职的同事，可能正承受着巨大的压力。我们总是拿自己的全部去比较别人的高光时刻，这不公平。

你有没有想过，在某个人的眼里，你也是那个"令人羡慕"的存在？

也许是你的善良，也许是你的坚持，也许是你偶尔冒出的傻笑，也许是你认真做事的侧脸。这些你自己习以为常的东西，在别人看来可能闪闪发光。

我曾经也是一个觉得自己"不够好"的人。直到有一天，一个朋友对我说："你知道吗，我一直很羡慕你。你总是那么真实，不伪装，不讨好。"

那一刻我才明白，原来我以为的"不够好"，在别人眼里恰恰是最珍贵的品质。

所以，请不要再否定自己了。

你不必完美，不必耀眼，不必活成别人期待的样子。你只需要做你自己——那个独一无二的、有缺点但也在努力的你。

这个世界不需要另一个"完美"的人，但这个世界需要你。

记住：你的存在，本身就是一种美好。`,
    images: [],
    hasJourney: false,
    likes: 2156,
    collects: 1023,
    comments: 3,
    createdAt: '2026-07-08T11:20:00Z',
  },
];

export const mockPosts: DreamPost[] = rawPosts.map(post => ({
  ...post,
  postType: post.postType || 'dream',
}));

export const mockChatSessions: ChatSession[] = [
  {
    id: 'chat1',
    partnerId: 'user1',
    partnerName: '浪漫的彗星',
    partnerConstellation: '白羊座',
    lastMessage: '期待你的好消息！',
    lastMessageTime: '2026-07-12T18:30:00Z',
    unreadCount: 2,
    messages: [
      { id: 'cm1', sessionId: 'chat1', content: '你好！看了你的帖子，很有共鸣。', senderId: 'user1', senderName: '浪漫的彗星', senderConstellation: '白羊座', isMine: false, createdAt: '2026-07-12T10:00:00Z' },
      { id: 'cm2', sessionId: 'chat1', content: '谢谢你的支持！你也在学画画吗？', senderId: 'me', senderName: '我', senderConstellation: '双子座', isMine: true, createdAt: '2026-07-12T10:15:00Z' },
      { id: 'cm3', sessionId: 'chat1', content: '是的！我学了一年了，现在已经可以接单了。', senderId: 'user1', senderName: '浪漫的彗星', senderConstellation: '白羊座', isMine: false, createdAt: '2026-07-12T10:30:00Z' },
      { id: 'cm4', sessionId: 'chat1', content: '太棒了！能给我一些学习建议吗？', senderId: 'me', senderName: '我', senderConstellation: '双子座', isMine: true, createdAt: '2026-07-12T10:45:00Z' },
      { id: 'cm5', sessionId: 'chat1', content: '可以先从临摹开始，找到自己喜欢的风格。然后每天坚持练习，量变引起质变。', senderId: 'user1', senderName: '浪漫的彗星', senderConstellation: '白羊座', isMine: false, createdAt: '2026-07-12T11:00:00Z' },
      { id: 'cm6', sessionId: 'chat1', content: '好的，我会坚持的！', senderId: 'me', senderName: '我', senderConstellation: '双子座', isMine: true, createdAt: '2026-07-12T11:15:00Z' },
      { id: 'cm7', sessionId: 'chat1', content: '期待你的好消息！', senderId: 'user1', senderName: '浪漫的彗星', senderConstellation: '白羊座', isMine: false, createdAt: '2026-07-12T18:30:00Z' },
    ],
  },
  {
    id: 'chat2',
    partnerId: 'user2',
    partnerName: '闪烁的星轨',
    partnerConstellation: '天秤座',
    lastMessage: '加油！你可以的！',
    lastMessageTime: '2026-07-11T20:00:00Z',
    unreadCount: 0,
    messages: [
      { id: 'cm8', sessionId: 'chat2', content: '你是怎么决定去大理开咖啡馆的？', senderId: 'user2', senderName: '闪烁的星轨', senderConstellation: '天秤座', isMine: false, createdAt: '2026-07-10T09:00:00Z' },
      { id: 'cm9', sessionId: 'chat2', content: '当时工作压力太大，感觉人生不能这样浪费。存了两年钱就辞职了。', senderId: 'me', senderName: '我', senderConstellation: '双子座', isMine: true, createdAt: '2026-07-10T09:30:00Z' },
      { id: 'cm10', sessionId: 'chat2', content: '真勇敢！我也想做类似的决定，但很害怕。', senderId: 'user2', senderName: '闪烁的星轨', senderConstellation: '天秤座', isMine: false, createdAt: '2026-07-10T10:00:00Z' },
      { id: 'cm11', sessionId: 'chat2', content: '确实需要勇气，但不试试怎么知道呢？先存够生活费，就有底气了。', senderId: 'me', senderName: '我', senderConstellation: '双子座', isMine: true, createdAt: '2026-07-10T10:30:00Z' },
      { id: 'cm12', sessionId: 'chat2', content: '加油！你可以的！', senderId: 'user2', senderName: '闪烁的星轨', senderConstellation: '天秤座', isMine: false, createdAt: '2026-07-11T20:00:00Z' },
    ],
  },
  {
    id: 'chat3',
    partnerId: 'user3',
    partnerName: '温柔的晨曦',
    partnerConstellation: '双鱼座',
    lastMessage: '一起加油！',
    lastMessageTime: '2026-07-12T19:30:00Z',
    unreadCount: 1,
    messages: [
      { id: 'cm13', sessionId: 'chat3', content: '夕阳真的很治愈，我也经常看。', senderId: 'user3', senderName: '温柔的晨曦', senderConstellation: '双鱼座', isMine: false, createdAt: '2026-07-12T18:00:00Z' },
      { id: 'cm14', sessionId: 'chat3', content: '是啊，那一刻所有疲惫都消失了。', senderId: 'me', senderName: '我', senderConstellation: '双子座', isMine: true, createdAt: '2026-07-12T18:15:00Z' },
      { id: 'cm15', sessionId: 'chat3', content: '生活中的小确幸，就是这样的瞬间。', senderId: 'user3', senderName: '温柔的晨曦', senderConstellation: '双鱼座', isMine: false, createdAt: '2026-07-12T18:30:00Z' },
      { id: 'cm16', sessionId: 'chat3', content: '一起加油！', senderId: 'user3', senderName: '温柔的晨曦', senderConstellation: '双鱼座', isMine: false, createdAt: '2026-07-12T19:30:00Z' },
    ],
  },
  {
    id: 'chat4',
    partnerId: 'user4',
    partnerName: '温暖的星光',
    partnerConstellation: '巨蟹座',
    lastMessage: '慢慢来，不要着急。',
    lastMessageTime: '2026-07-12T22:45:00Z',
    unreadCount: 0,
    messages: [
      { id: 'cm17', sessionId: 'chat4', content: '25岁真的很年轻！我28岁才找到方向。', senderId: 'user4', senderName: '温暖的星光', senderConstellation: '巨蟹座', isMine: false, createdAt: '2026-07-12T22:00:00Z' },
      { id: 'cm18', sessionId: 'chat4', content: '谢谢你的鼓励，我会继续努力的。', senderId: 'me', senderName: '我', senderConstellation: '双子座', isMine: true, createdAt: '2026-07-12T22:15:00Z' },
      { id: 'cm19', sessionId: 'chat4', content: '慢慢来，不要着急。', senderId: 'user4', senderName: '温暖的星光', senderConstellation: '巨蟹座', isMine: false, createdAt: '2026-07-12T22:45:00Z' },
    ],
  },
  {
    id: 'chat5',
    partnerId: 'user5',
    partnerName: '暖心的月光',
    partnerConstellation: '双鱼座',
    lastMessage: '记得照顾好自己。',
    lastMessageTime: '2026-07-12T23:50:00Z',
    unreadCount: 0,
    messages: [
      { id: 'cm20', sessionId: 'chat5', content: '抱抱你，加班真的很辛苦。', senderId: 'user5', senderName: '暖心的月光', senderConstellation: '双鱼座', isMine: false, createdAt: '2026-07-12T23:00:00Z' },
      { id: 'cm21', sessionId: 'chat5', content: '谢谢，今天确实太累了。', senderId: 'me', senderName: '我', senderConstellation: '双子座', isMine: true, createdAt: '2026-07-12T23:30:00Z' },
      { id: 'cm22', sessionId: 'chat5', content: '记得照顾好自己。', senderId: 'user5', senderName: '暖心的月光', senderConstellation: '双鱼座', isMine: false, createdAt: '2026-07-12T23:50:00Z' },
    ],
  },
];

export const mockMessages: DreamMessage[] = [
  {
    id: 'm1',
    fromPostId: '1',
    type: 'empathy',
    content: '我也有类似的想法，每天上班都觉得很压抑。你不是一个人，加油！',
    sender: { nickname: '浪漫的彗星', constellation: '白羊座' },
    createdAt: '2026-07-12T11:30:00Z',
    replied: false,
  },
  {
    id: 'm2',
    fromPostId: '3',
    type: 'question',
    content: '你是怎么决定去大理的？当时辞职能行吗？我也想做类似的决定，但很害怕。',
    sender: { nickname: '闪烁的星轨', constellation: '天秤座' },
    createdAt: '2026-07-10T10:15:00Z',
    replied: true,
  },
  {
    id: 'm3',
    fromPostId: '3',
    type: 'share',
    content: '我也走过这条路。当时我存了两年的钱，然后才敢辞职。建议你先存够至少一年的生活费，这样会更有底气。',
    sender: { nickname: '永恒的星环', constellation: '金牛座' },
    createdAt: '2026-07-10T11:00:00Z',
    replied: false,
  },
  {
    id: 'm4',
    fromPostId: '5',
    type: 'empathy',
    content: '夕阳真的很治愈。我也经常在下班路上看夕阳，那一刻所有的疲惫都消失了。',
    sender: { nickname: '温柔的晨曦', constellation: '双鱼座' },
    createdAt: '2026-07-12T19:00:00Z',
    replied: false,
  },
  {
    id: 'm5',
    fromPostId: '10',
    type: 'empathy',
    content: '25岁真的很年轻！我28岁才找到自己想做的事情。不要着急，慢慢来，你会找到方向的。',
    sender: { nickname: '温暖的星光', constellation: '巨蟹座' },
    createdAt: '2026-07-12T22:30:00Z',
    replied: false,
  },
  {
    id: 'm6',
    fromPostId: '8',
    type: 'empathy',
    content: '抱抱你，加班真的很辛苦。记得照顾好自己，身体是革命的本钱。',
    sender: { nickname: '暖心的月光', constellation: '双鱼座' },
    createdAt: '2026-07-12T23:45:00Z',
    replied: false,
  },
  {
    id: 'm7',
    fromPostId: '4',
    type: 'question',
    content: '环游世界需要多少钱啊？我也想做，但感觉需要很多钱。',
    sender: { nickname: '向往的星星', constellation: '射手座' },
    createdAt: '2026-07-09T17:30:00Z',
    replied: true,
  },
];

export const mockComments: DreamComment[] = [
  { id: 'c1', postId: '1', author: { nickname: '浪漫的彗星', constellation: '白羊座' }, content: '不晚！我35岁才开始学画画，现在已经可以接单了。', likes: 45, createdAt: '2026-07-12T11:30:00Z' },
  { id: 'c2', postId: '1', author: { nickname: '闪烁的星轨', constellation: '天秤座' }, content: '支持你！我也是辞掉工作去学插画的，现在在设计公司工作。', likes: 32, createdAt: '2026-07-12T12:00:00Z' },
  { id: 'c3', postId: '1', author: { nickname: '温柔的晨曦', constellation: '双鱼座' }, content: '可以先利用业余时间学一学，看看自己是不是真的喜欢。', likes: 18, createdAt: '2026-07-12T12:30:00Z' },
  { id: 'c4', postId: '1', author: { nickname: '深邃的星海', constellation: '天蝎座' }, content: '兴趣是最好的老师，加油！', likes: 22, createdAt: '2026-07-12T13:00:00Z' },
  { id: 'c5', postId: '1', author: { nickname: '温暖的星光', constellation: '巨蟹座' }, content: '30岁正是最好的年纪，有阅历有想法。', likes: 38, createdAt: '2026-07-12T13:30:00Z' },
  { id: 'c6', postId: '1', author: { nickname: '神秘的黑洞', constellation: '摩羯座' }, content: '我也想辞职，但没勇气。你迈出第一步很了不起。', likes: 25, createdAt: '2026-07-12T14:00:00Z' },
  { id: 'c7', postId: '1', author: { nickname: '梦幻的星云', constellation: '双鱼座' }, content: '插画真的很美，期待看到你的作品！', likes: 19, createdAt: '2026-07-12T14:30:00Z' },
  { id: 'c8', postId: '1', author: { nickname: '灿烂的星河', constellation: '双子座' }, content: '行动起来，别想太多！', likes: 31, createdAt: '2026-07-12T15:00:00Z' },
  { id: 'c9', postId: '1', author: { nickname: '闪耀的金星', constellation: '狮子座' }, content: '加油加油！我看好你！', likes: 28, createdAt: '2026-07-12T15:30:00Z' },
  { id: 'c10', postId: '1', author: { nickname: '孤独的行星', constellation: '水瓶座' }, content: '零基础也可以学，只要坚持。', likes: 35, createdAt: '2026-07-12T16:00:00Z' },
  { id: 'c11', postId: '1', author: { nickname: '永恒的星环', constellation: '金牛座' }, content: '可以先从临摹开始，慢慢找到自己的风格。', likes: 24, createdAt: '2026-07-12T16:30:00Z' },
  { id: 'c12', postId: '1', author: { nickname: '暖心的月光', constellation: '双鱼座' }, content: '我也在学，一起进步！', likes: 21, createdAt: '2026-07-12T17:00:00Z' },
  { id: 'c13', postId: '1', author: { nickname: '朦胧的月光', constellation: '巨蟹座' }, content: '想做就去做，人生苦短。', likes: 33, createdAt: '2026-07-12T17:30:00Z' },
  { id: 'c14', postId: '1', author: { nickname: '银河', constellation: '白羊座' }, content: '支持你追逐梦想！', likes: 26, createdAt: '2026-07-12T18:00:00Z' },
  { id: 'c15', postId: '1', author: { nickname: '极光', constellation: '狮子座' }, content: '期待你的好消息！', likes: 17, createdAt: '2026-07-12T18:30:00Z' },

  { id: 'c16', postId: '2', author: { nickname: '温柔的晨曦', constellation: '双鱼座' }, content: '海边书店太浪漫了！', likes: 45, createdAt: '2026-07-11T14:30:00Z' },
  { id: 'c17', postId: '2', author: { nickname: '深邃的星海', constellation: '天蝎座' }, content: '这个想法太棒了，我也有类似的梦想。', likes: 38, createdAt: '2026-07-11T15:00:00Z' },
  { id: 'c18', postId: '2', author: { nickname: '温暖的星光', constellation: '巨蟹座' }, content: '存钱计划很重要，加油！', likes: 29, createdAt: '2026-07-11T15:30:00Z' },
  { id: 'c19', postId: '2', author: { nickname: '神秘的黑洞', constellation: '摩羯座' }, content: '咖啡和书的组合，完美！', likes: 32, createdAt: '2026-07-11T16:00:00Z' },
  { id: 'c20', postId: '2', author: { nickname: '梦幻的星云', constellation: '双鱼座' }, content: '五年了还在坚持，很不容易。', likes: 41, createdAt: '2026-07-11T16:30:00Z' },
  { id: 'c21', postId: '2', author: { nickname: '灿烂的星河', constellation: '双子座' }, content: '厦门的书店我去过，确实很美。', likes: 27, createdAt: '2026-07-11T17:00:00Z' },
  { id: 'c22', postId: '2', author: { nickname: '闪耀的金星', constellation: '狮子座' }, content: '已经存了一半了，很快就能实现！', likes: 36, createdAt: '2026-07-11T17:30:00Z' },
  { id: 'c23', postId: '2', author: { nickname: '孤独的行星', constellation: '水瓶座' }, content: '加油，期待你的书店开业！', likes: 28, createdAt: '2026-07-11T18:00:00Z' },

  { id: 'c24', postId: '3', author: { nickname: '永恒的星环', constellation: '金牛座' }, content: '太羡慕你了！我也想辞职去大理，但没有勇气。', likes: 56, createdAt: '2026-07-10T10:30:00Z' },
  { id: 'c25', postId: '3', author: { nickname: '暖心的月光', constellation: '双鱼座' }, content: '大理真的很美，我去年去过。', likes: 43, createdAt: '2026-07-10T11:00:00Z' },
  { id: 'c26', postId: '3', author: { nickname: '朦胧的月光', constellation: '巨蟹座' }, content: '两只猫太幸福了！', likes: 48, createdAt: '2026-07-10T11:30:00Z' },
  { id: 'c27', postId: '3', author: { nickname: '银河', constellation: '白羊座' }, content: '三年了，时间过得真快。', likes: 35, createdAt: '2026-07-10T12:00:00Z' },
  { id: 'c28', postId: '3', author: { nickname: '极光', constellation: '狮子座' }, content: '坚持做自己喜欢的事，很了不起。', likes: 52, createdAt: '2026-07-10T12:30:00Z' },
  { id: 'c29', postId: '3', author: { nickname: '浪漫的彗星', constellation: '白羊座' }, content: '存够一年生活费这个建议很实用。', likes: 46, createdAt: '2026-07-10T13:00:00Z' },
  { id: 'c30', postId: '3', author: { nickname: '闪烁的星轨', constellation: '天秤座' }, content: '三个客人也是开始，积少成多。', likes: 39, createdAt: '2026-07-10T13:30:00Z' },

  { id: 'c31', postId: '4', author: { nickname: '向往的星星', constellation: '射手座' }, content: '太厉害了！30个国家。', likes: 89, createdAt: '2026-07-09T17:00:00Z' },
  { id: 'c32', postId: '4', author: { nickname: '仙女座', constellation: '双鱼座' }, content: '旅行中有没有特别难忘的事情？', likes: 64, createdAt: '2026-07-09T17:30:00Z' },
  { id: 'c33', postId: '4', author: { nickname: '梦幻的星云', constellation: '双鱼座' }, content: '马丘比丘真的很震撼！', likes: 72, createdAt: '2026-07-09T18:00:00Z' },
  { id: 'c34', postId: '4', author: { nickname: '深邃的星空', constellation: '天蝎座' }, content: '两年时间走过这么多地方，太牛了！', likes: 68, createdAt: '2026-07-09T18:30:00Z' },
  { id: 'c35', postId: '4', author: { nickname: '温暖的星辰', constellation: '射手座' }, content: '路上遇到的人一定很有趣。', likes: 59, createdAt: '2026-07-09T19:00:00Z' },

  { id: 'c36', postId: '5', author: { nickname: '温暖的星光', constellation: '巨蟹座' }, content: '夕阳确实很治愈。', likes: 42, createdAt: '2026-07-12T19:00:00Z' },
  { id: 'c37', postId: '5', author: { nickname: '梦幻的星云', constellation: '双鱼座' }, content: '同感！我每天下班都会看夕阳。', likes: 38, createdAt: '2026-07-12T19:30:00Z' },
  { id: 'c38', postId: '5', author: { nickname: '暖心的月光', constellation: '双鱼座' }, content: '小确幸就是这样的。', likes: 29, createdAt: '2026-07-12T20:00:00Z' },
  { id: 'c39', postId: '5', author: { nickname: '朦胧的月光', constellation: '巨蟹座' }, content: '珍惜生活中的小美好。', likes: 35, createdAt: '2026-07-12T20:30:00Z' },

  { id: 'c40', postId: '6', author: { nickname: '温柔的晨曦', constellation: '双鱼座' }, content: '番茄炒蛋最简单也最美味。', likes: 24, createdAt: '2026-07-11T08:30:00Z' },
  { id: 'c41', postId: '6', author: { nickname: '深邃的星海', constellation: '天蝎座' }, content: '自己做饭很治愈。', likes: 19, createdAt: '2026-07-11T09:00:00Z' },

  { id: 'c42', postId: '7', author: { nickname: '银河', constellation: '白羊座' }, content: '太可爱了！我也喜欢猫。', likes: 76, createdAt: '2026-07-10T15:30:00Z' },
  { id: 'c43', postId: '7', author: { nickname: '极光', constellation: '狮子座' }, content: '小动物真的很治愈。', likes: 54, createdAt: '2026-07-10T16:00:00Z' },
  { id: 'c44', postId: '7', author: { nickname: '浪漫的彗星', constellation: '白羊座' }, content: '晒太阳的猫咪最可爱。', likes: 63, createdAt: '2026-07-10T16:30:00Z' },

  { id: 'c45', postId: '8', author: { nickname: '神秘的黑洞', constellation: '摩羯座' }, content: '加班真的太辛苦了，抱抱你。', likes: 67, createdAt: '2026-07-12T23:45:00Z' },
  { id: 'c46', postId: '8', author: { nickname: '深邃的星空', constellation: '天蝎座' }, content: '同样加班中，一起加油！', likes: 54, createdAt: '2026-07-13T00:00:00Z' },
  { id: 'c47', postId: '8', author: { nickname: '温暖的星光', constellation: '巨蟹座' }, content: '外卖凉了确实很让人难过。', likes: 48, createdAt: '2026-07-13T00:30:00Z' },

  { id: 'c48', postId: '9', author: { nickname: '梦幻的星云', constellation: '双鱼座' }, content: '老板太过分了！', likes: 56, createdAt: '2026-07-11T17:30:00Z' },
  { id: 'c49', postId: '9', author: { nickname: '暖心的月光', constellation: '双鱼座' }, content: '成年人的世界真的不容易。', likes: 47, createdAt: '2026-07-11T18:00:00Z' },

  { id: 'c50', postId: '10', author: { nickname: '闪耀的金星', constellation: '狮子座' }, content: '25岁真的很年轻！', likes: 78, createdAt: '2026-07-12T22:30:00Z' },
  { id: 'c51', postId: '10', author: { nickname: '灿烂的星河', constellation: '双子座' }, content: '多尝试不同的事情。', likes: 65, createdAt: '2026-07-12T23:00:00Z' },
  { id: 'c52', postId: '10', author: { nickname: '孤独的行星', constellation: '水瓶座' }, content: '不要和别人比，找到自己的节奏。', likes: 59, createdAt: '2026-07-12T23:30:00Z' },

  { id: 'c53', postId: '11', author: { nickname: '温柔的晨曦', constellation: '双鱼座' }, content: '抱抱你，时间会治愈一切。', likes: 72, createdAt: '2026-07-11T21:00:00Z' },
  { id: 'c54', postId: '11', author: { nickname: '深邃的星海', constellation: '天蝎座' }, content: '一个人也可以活得很好。', likes: 64, createdAt: '2026-07-11T21:30:00Z' },

  { id: 'c55', postId: '12', author: { nickname: '温暖的星辰', constellation: '射手座' }, content: '谢谢你的鼓励！', likes: 98, createdAt: '2026-07-10T06:30:00Z' },
  { id: 'c56', postId: '12', author: { nickname: '梦幻的星云', constellation: '双鱼座' }, content: '收藏了，每天看一遍！', likes: 85, createdAt: '2026-07-10T07:00:00Z' },
  { id: 'c57', postId: '12', author: { nickname: '暖心的月光', constellation: '双鱼座' }, content: '送给正在迷茫的自己。', likes: 76, createdAt: '2026-07-10T07:30:00Z' },

  { id: 'c58', postId: '13', author: { nickname: '朦胧的月光', constellation: '巨蟹座' }, content: '这段话太治愈了！', likes: 89, createdAt: '2026-07-09T11:00:00Z' },
  { id: 'c59', postId: '13', author: { nickname: '银河', constellation: '白羊座' }, content: '每一步都算数，说得真好。', likes: 77, createdAt: '2026-07-09T11:30:00Z' },

  { id: 'c60', postId: '14', author: { nickname: '极光', constellation: '狮子座' }, content: '写作很棒，支持你！', likes: 38, createdAt: '2026-07-12T09:30:00Z' },

  { id: 'c61', postId: '15', author: { nickname: '朦胧的月光', constellation: '巨蟹座' }, content: '橘猫都很可爱！恭喜你！', likes: 67, createdAt: '2026-07-11T21:30:00Z' },
  { id: 'c62', postId: '15', author: { nickname: '温柔的晨曦', constellation: '双鱼座' }, content: '汤圆这个名字好可爱！', likes: 55, createdAt: '2026-07-11T22:00:00Z' },

  { id: 'c63', postId: '16', author: { nickname: '浪漫的彗星', constellation: '白羊座' }, content: '留学加油！', likes: 35, createdAt: '2026-07-12T14:30:00Z' },

  { id: 'c64', postId: '17', author: { nickname: '闪烁的星轨', constellation: '天秤座' }, content: '理解你，父母的比较真的很累。', likes: 48, createdAt: '2026-07-12T20:00:00Z' },

  { id: 'c65', postId: '18', author: { nickname: '深邃的星空', constellation: '天蝎座' }, content: '简单的快乐最珍贵。', likes: 29, createdAt: '2026-07-11T13:30:00Z' },

  { id: 'c66', postId: '19', author: { nickname: '温暖的星光', constellation: '巨蟹座' }, content: '30岁真的不算晚。', likes: 123, createdAt: '2026-07-10T09:30:00Z' },
  { id: 'c67', postId: '19', author: { nickname: '梦幻的星云', constellation: '双鱼座' }, content: '那个老人的话很有道理。', likes: 98, createdAt: '2026-07-10T10:00:00Z' },
  { id: 'c68', postId: '19', author: { nickname: '暖心的月光', constellation: '双鱼座' }, content: '学会和迷茫相处，说得太好了。', likes: 87, createdAt: '2026-07-10T10:30:00Z' },

  { id: 'c69', postId: '20', author: { nickname: '朦胧的月光', constellation: '巨蟹座' }, content: '北漂真的很不容易。', likes: 156, createdAt: '2026-07-09T15:00:00Z' },
  { id: 'c70', postId: '20', author: { nickname: '银河', constellation: '白羊座' }, content: '逃离基金这个建议很实用。', likes: 134, createdAt: '2026-07-09T15:30:00Z' },
  { id: 'c71', postId: '20', author: { nickname: '极光', constellation: '狮子座' }, content: '坚持下去，你已经很棒了！', likes: 122, createdAt: '2026-07-09T16:00:00Z' },

  { id: 'c72', postId: '21', author: { nickname: '浪漫的彗星', constellation: '白羊座' }, content: '谢谢你，我哭了。', likes: 256, createdAt: '2026-07-08T11:30:00Z' },
  { id: 'c73', postId: '21', author: { nickname: '闪烁的星轨', constellation: '天秤座' }, content: '每个人都是独一无二的。', likes: 223, createdAt: '2026-07-08T12:00:00Z' },
  { id: 'c74', postId: '21', author: { nickname: '温柔的晨曦', constellation: '双鱼座' }, content: '你的存在本身就是美好。', likes: 198, createdAt: '2026-07-08T12:30:00Z' },
];

export const mockUser: User = {
  nickname: '',
  constellation: '',
  joinedAt: new Date().toISOString(),
  posts: [],
  collections: ['3', '4', '12'],
  messages: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'],
  likedPosts: [],
  likedComments: [],
};
