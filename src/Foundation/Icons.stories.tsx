import React, { useState, useMemo } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as IconsaxIcons from 'iconsax-react'

// Brand Icons
import { MurfyLogo } from '../Atoms/BrandIcons/MurfyLogo'
import { Facebook } from '../Atoms/Icons/Facebook'
import { Instagram } from '../Atoms/Icons/Instagram'
import { LinkedIn } from '../Atoms/Icons/LinkedIn'
import { X } from '../Atoms/Icons/X'
import { YouTube } from '../Atoms/Icons/YouTube'
import { Tick } from '../Atoms/Icons/Tick'
import { ChevronRight } from '../Atoms/Icons/ChevronRight'
import { ChevronLeft } from '../Atoms/Icons/ChevronLeft'
import { ChevronUp } from '../Atoms/Icons/ChevronUp'
import { ChevronDown } from '../Atoms/Icons/ChevronDown'

const meta: Meta = {
  title: 'Foundation/Icons',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ─── Brand Icons ─────────────────────────────────────────────────────────────

const BRAND_ICONS = {
  'Brand Logo': [
    { name: 'MurfyLogo', Icon: MurfyLogo },
  ],
  'Social Icons': [
    { name: 'Facebook', Icon: Facebook },
    { name: 'Instagram', Icon: Instagram },
    { name: 'LinkedIn', Icon: LinkedIn },
    { name: 'X', Icon: X },
    { name: 'YouTube', Icon: YouTube },
  ],
  'UI Icons': [
    { name: 'Tick', Icon: Tick },
    { name: 'ChevronRight', Icon: ChevronRight },
    { name: 'ChevronLeft', Icon: ChevronLeft },
    { name: 'ChevronUp', Icon: ChevronUp },
    { name: 'ChevronDown', Icon: ChevronDown },
  ]
}

// ─── Icon catalogue (from iconsax-react meta-data.json) ───────────────────────

const CATEGORIES: Record<string, string[]> = {
  'Essential': ['I3Dcube','AddCircle','AddSquare','Add','ArchiveBox','Autobrightness','BatteryCharging','BatteryDisable','BatteryEmpty1','BatteryEmpty','BatteryFull','Box2','Broom','Bubble','Cake','Cd','ChartCircle','Chrome','CloseCircle','CloseSquare','Coffee','Computing','Crown1','Crown','Cup','Danger','Diamonds','Discover','EmojiHappy','EmojiNormal','EmojiSad','FilterAdd','FilterEdit','FilterRemove','FilterSearch','FilterSquare','FilterTick','Filter','Flag2','Flag','FlashCircle','FlashSlash','Flash','Forbidden2','Forbidden','Ghost','Glass','Grammerly','HambergerMenu','Happyemoji','Home2','Home3','HomeWifi','Home','InfoCircle','Information','Instagram','Judge','Lamp','Level','Milk','MinusCirlce','MinusSquare','Minus','Mirror','MoreCircle','MoreSquare','MouseCircle','MouseSquare','Pet','Pointer','Rank','Reserve','SafeHome','Send2','Send','Share','Signpost','Slash','Slider','SmartHome','Sort','Sound','Speedometer','Status','Sticker','Story','TagCross','TagRight','TickCircle','TickSquare','Trash','Tree','Triangle','TrushSquare','Verify','Warning2','Weight','WifiSquare','Wifi'],
  'Arrow': ['ArrangeHorizontalCircle','ArrangeHorizontalSquare','ArrangeHorizontal','ArrangeVerticalCircle','ArrangeVerticalSquare','ArrangeVertical','ArrowCircleDown2','ArrowCircleDown','ArrowCircleLeft2','ArrowCircleLeft','ArrowCircleRight2','ArrowCircleRight','ArrowCircleUp2','ArrowCircleUp','ArrowDown2','ArrowDown3','ArrowDown','ArrowForwardSquare','ArrowForward','ArrowLeft2','ArrowLeft3','ArrowLeft','ArrowRight2','ArrowRight3','ArrowRight','ArrowRotateLeft','ArrowRotateRight','ArrowSquareDown','ArrowSquareLeft','ArrowSquareRight','ArrowSquareUp','ArrowSwapHorizontal','ArrowSwapVertical','ArrowUp2','ArrowUp3','ArrowUp','BackSquare','Back','Convert','ExportCircle','ExportCurve','ExportSquare','Export','ImportCircle','ImportCurve','ImportSquare','Import','LoginCurve','Login','LogoutCurve','Logout','ReceiveSquare2','ReceiveSquare','Receive','Refresh2','RefreshCircle','RefreshLeftSquare','RefreshRightSquare','RefreshSquare','Refresh','RepeatCircle','Repeat','TransmitSqaure2','TransmitSquare','Transmit'],
  'Users': ['People','Profile2User','ProfileAdd','ProfileCircle','ProfileDelete','ProfileRemove','ProfileTick','Profile','TagUser','UserAdd','UserCirlceAdd','UserEdit','UserMinus','UserOctagon','UserRemove','UserSearch','UserSquare','UserTag','UserTick','User'],
  'Business': ['Activity','Chart1','Chart2','Chart21','ChartFail','ChartSuccess','Chart','Diagram','FavoriteChart','Graph','HashtagSquare','Health','HomeHashtag','HomeTrendDown','HomeTrendUp','Personalcard','PresentionChart','StatusUp','TrendDown','TrendUp'],
  'Security': ['Alarm','Brodcast','Check','EyeSlash','Eye','FingerCricle','FingerScan','KeySquare','Key','Lock1','LockCircle','LockSlash','Lock','PasswordCheck','ScanBarcode','Scan','Scanner','Scanning','SecuritySafe','SecurityUser','Security','ShieldCross','ShieldSearch','ShieldSecurity','ShieldSlash','ShieldTick','Shield','Unlock'],
  'Call': ['CallAdd','CallCalling','CallIncoming','CallMinus','CallOutgoing','CallReceived','CallRemove','CallSlash','Call'],
  'Location': ['ArrowSquare','Arrow','DirectDown','DirectLeft','DirectRight','DirectUp','GlobalEdit','GlobalRefresh','GlobalSearch','Global','GpsSlash','Gps','LocationAdd','LocationCross','LocationDiscover','LocationMinus','LocationSlash','LocationTick','Location','Map1','Map','PictureFrame','Radar2','Radar','RouteSquare','Routing2','Routing'],
  'Emails, Messages': ['DeviceMessage','DirectInbox','DirectNormal','DirectNotification','DirectSend','Direct','DirectboxDefault','DirectboxNotif','DirectboxReceive','DirectboxSend','Message2','MessageAdd1','MessageAdd','MessageCircle','MessageEdit','MessageFavorite','MessageMinus','MessageNotif','MessageRemove','MessageSearch','MessageSquare','MessageText1','MessageText','MessageTick','MessageTime','Message','Messages1','Messages2','Messages3','Messages','SmsEdit','SmsNotification','SmsSearch','SmsStar','SmsTracking','Sms'],
  'Money': ['CardAdd','CardEdit','CardPos','CardReceive','CardRemove1','CardRemove','CardSend','CardSlash','CardTick1','CardTick','Card','Cards','ChartSquare','Coin1','Coin','ConvertCard','DiscountCircle','DiscountShape','DollarCircle','DollarSquare','EmptyWalletAdd','EmptyWalletChange','EmptyWalletRemove','EmptyWalletTick','EmptyWalletTime','EmptyWallet','Math','Money2','Money3','Money4','MoneyAdd','MoneyArchive','MoneyChange','MoneyForbidden','MoneyRecive','MoneyRemove','MoneySend','MoneyTick','MoneyTime','Money','Moneys','PercentageCircle','PercentageSquare','Receipt1','Receipt21','Receipt2','ReceiptAdd','ReceiptDiscount','ReceiptDisscount','ReceiptEdit','ReceiptItem','ReceiptMinus','ReceiptSearch','ReceiptText','Receipt','SecurityCard','Strongbox2','Strongbox','TableDocument','Tag2','Tag','Ticket2','TicketDiscount','TicketExpired','TicketStar','Ticket','TransactionMinus','Wallet1','Wallet2','Wallet3','WalletAdd1','WalletAdd','WalletCheck','WalletMinus','WalletMoney','WalletRemove','WalletSearch','Wallet'],
  'Shop': ['Bag2','BagCross1','BagCross','BagHappy','BagTick2','BagTick','BagTimer','Bag','Barcode','ShopAdd','ShopRemove','Shop','ShoppingBag','ShoppingCart'],
  'Delivery': ['I3DCubeScan','I3DRotate','I3DSquare','Box1','BoxAdd','BoxRemove','BoxSearch','BoxTick','BoxTime','Box','Convert3DCube','TruckFast','TruckRemove','TruckTick','TruckTime','Truck'],
  'Settings': ['Candle2','Candle','Category2','Category','Menu','More2','More','Setting2','Setting3','Setting4','Setting5','Setting','Settings','ToggleOffCircle','ToggleOff','ToggleOnCircle','ToggleOn'],
  'Search': ['SearchFavorite1','SearchFavorite','SearchNormal1','SearchNormal','SearchStatus1','SearchStatus','SearchZoomIn1','SearchZoomIn','SearchZoomOut1','SearchZoomOut'],
  'Files': ['Folder2','FolderAdd','FolderCloud','FolderCross','FolderFavorite','FolderMinus','FolderOpen','Folder'],
  'Content-Edit': ['ArchiveBook','Bill','ClipboardClose','ClipboardExport','ClipboardImport','ClipboardText','ClipboardTick','Copyright','CreativeCommons','DocumentCloud','DocumentCopy','DocumentDownload','DocumentFavorite','DocumentFilter','DocumentForward','DocumentLike','DocumentPrevious','DocumentSketch','DocumentText1','DocumentText','DocumentUpload','Document','Edit2','Edit','MenuBoard','Note1','NoteAdd','NoteFavorite','NoteRemove','NoteText','Note','Stickynote','TaskSquare','Task'],
  'Support & Like': ['I24Support','Dislike','HeartAdd','HeartCircle','HeartEdit','HeartRemove','HeartSearch','HeartSlash','HeartTick','Heart','Like1','LikeDislike','LikeShapes','LikeTag','Like','Lovely','MagicStar','MedalStar','Medal','MessageQuestion','Ranking','Smileys','Star1','StarSlash','Star','Unlimited'],
  'Time': ['Calendar1','Calendar2','CalendarAdd','CalendarCircle','CalendarEdit','CalendarRemove','CalendarSearch','CalendarTick','Calendar','Clock','SecurityTime','Timer1','TimerPause','TimerStart','Timer'],
  'Video & Media': ['AudioSquare','Backward10Seconds','Backward15Seconds','Backward5Seconds','Backward','CameraSlash','Camera','Cut','Forward10Seconds','Forward15Seconds','Forward5Seconds','Forward','GalleryAdd','GalleryEdit','GalleryExport','GalleryFavorite','GalleryImport','GalleryRemove','GallerySlash','GalleryTick','Gallery','Image','MaximizeCircle','Microphone2','MicrophoneSlash1','MicrophoneSlash','Microphone','MiniMusicSqaure','MusicCircle','MusicDashboard','MusicFilter','MusicLibrary2','MusicPlaylist','MusicSquareAdd','MusicSquareRemove','MusicSquareSearch','MusicSquare','Music','Musicnote','Next','NoteSquare','PauseCircle','Pause','PlayAdd','PlayCircle','PlayCricle','PlayRemove','Play','Previous','Radio','RecordCircle','Record','RepeateMusic','RepeateOne','Screenmirroring','Shuffle','StopCircle','Stop','Subtitle','VideoAdd','VideoCircle','VideoHorizontal','VideoOctagon','VideoPlay','VideoRemove','VideoSlash','VideoSquare','VideoTick','VideoTime','VideoVertical','Video','VoiceCricle','VoiceSquare','VolumeCross','VolumeHigh','VolumeLow1','VolumeLow','VolumeMute','VolumeSlash','VolumeUp','Volume'],
  'Design Tools': ['Additem','BackwardItem','Bezier','Blend2','Blend','Blur','Brush2','Brush3','BrushBig','BrushSquare','Brush','BucketCircle','BucketSquare','Bucket','ChemicalGlass','ColorSwatch','Colorfilter','ColorsSquare','Component','CopySuccess','Copy','Designtools','Eraser','ForwardItem','Layer','Lifebuoy','Magicpen','MainComponent','MaskLeft','MaskRight','Mask','OmegaCircle','OmegaSquare','Paintbucket','PathTool2','PathToolSquare','PathTool','PenAdd','PenClose','PenRemove','PenTool2','PenTool','RecoveryConvert','RulerPen','Ruler','Scissor','Shapes1','Shapes','Size'],
  'Grid & Layout': ['I3Square','AlignBottom','AlignHorizontally','AlignLeft','AlignRight','AlignTop','AlignVertically','Convertshape2','Convertshape','Crop','Element2','Element3','Element4','ElementEqual','ElementPlus','Element','Fatrows','FormatCircle','FormatSquare','Grid1','Grid2','Grid3','Grid4','Grid5','Grid6','Grid7','Grid8','Grid9','GridEdit','GridEraser','GridLock','Kanban','Maximize1','Maximize2','Maximize3','Maximize4','Maximize','RotateLeft','RotateRight','RowHorizontal','RowVertical','SliderHorizontal1','SliderHorizontal','SliderVertical1','SliderVertical'],
  'Devices': ['Airdrop','Airpod','Airpods','Bluetooth2','BluetoothCircle','BluetoothRectangle','Bluetooth','CloudAdd','CloudChange','CloudConnection','CloudRemove','CpuCharge','CpuSetting','Cpu','Devices','Driver2','DriverRefresh','Driver','Electricity','ExternalDrive','FolderConnection','Game','Gameboy','Headphone','Headphones','KeyboardOpen','Keyboard','Microscope','MirroringScreen','Mobile','MonitorMobbile','MonitorRecorder','Monitor','Mouse','MusicPlay','PrinterSlash','Printer','Ram2','Ram','Simcard1','Simcard2','Simcard','Speaker','TableLamp','WatchStatus','Watch','WeightMeter','WristClock'],
  'Weather': ['CloudCross','CloudDrizzle','CloudFog','CloudLightning','CloudMinus','CloudNotif','CloudPlus','CloudSnow','CloudSunny','Cloud','Drop','Flashy','Moon','Sun1','SunFog','Sun','Wind2','Wind'],
  'Building': ['Bank','Building3','Building4','Building','Buildings2','Buildings','Buliding','Courthouse','Hospital','House2','House'],
  'School': ['Award','Book1','Book','Bookmark2','Bookmark','Briefcase','BrifecaseCross','BrifecaseTick','BrifecaseTimer','Calculator','Clipboard','Gift','Notepad2','Notepad','Teacher'],
  'Notifications': ['LampCharge','LampOn','LampSlash','Notification1','NotificationBing','NotificationCircle','NotificationFavorite','NotificationStatus','Notification'],
  'Type': ['AttachCircle','AttachSquare','EraserSquare','Firstline','LanguageCircle','LanguageSquare','LayoutMaximize','Link1','Link2','Link21','LinkCircle','LinkSquare','Link','Paperclip2','Paperclip','Pharagraphspacing','QuoteDownCircle','QuoteDownSquare','QuoteDown','QuoteUpCircle','QuoteUpSquare','QuoteUp','Smallcaps','TextBlock','TextBold','TextItalic','TextUnderline','Text','TextalignCenter','TextalignJustifycenter','TextalignJustifyleft','TextalignJustifyright','TextalignLeft','TextalignRight','Translate'],
  'Programing': ['Code1','CodeCircle','Code','CommandSquare','Command','Data2','Data','DocumentCode2','DocumentCode','HashtagDown','HashtagUp','Hashtag','Hierarchy2','Hierarchy3','HierarchySquare2','HierarchySquare3','HierarchySquare','Hierarchy','MessageProgramming','MobileProgramming','ProgrammingArrow','ProgrammingArrows','Scroll','SidebarBottom','SidebarLeft','SidebarRight','SidebarTop'],
  'Car': ['AirplaneSquare','Airplane','Bus','Car','Driving','GasStation','Ship','SmartCar'],
}

const VARIANTS = ['Linear', 'Broken', 'Bold', 'Bulk', 'Outline', 'TwoTone'] as const
type Variant = typeof VARIANTS[number]

const SIZES = [16, 20, 24, 32] as const
type IconSize = typeof SIZES[number]

// ─── Icon cell ────────────────────────────────────────────────────────────────

function IconCell({ name, variant, size, BrandIcon }: { name: string; variant: Variant; size: IconSize; BrandIcon?: React.ComponentType<{ width?: number; height?: number; style?: React.CSSProperties }> }) {
  const [copied, setCopied] = useState(false)
  
  const IconComp = BrandIcon || (IconsaxIcons as Record<string, React.ComponentType<{ size?: number; variant?: string; color?: string }>>)[name]

  if (!IconComp) return null

  const handleClick = () => {
    navigator.clipboard?.writeText(name).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <button
      onClick={handleClick}
      title={copied ? 'Copied!' : name}
      className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-transparent hover:border-border hover:bg-bg-2 transition-all group cursor-pointer text-center"
    >
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        {BrandIcon ? (
          <BrandIcon width={size} height={size} style={{ color: 'var(--text)' }} />
        ) : (
          <IconComp size={size} variant={variant} color="var(--text)" />
        )}
      </div>
      <span
        className="text-[10px] leading-tight opacity-50 group-hover:opacity-100 transition-opacity truncate w-full"
        style={{ color: 'var(--text)', maxWidth: 72 }}
      >
        {copied ? '✓ copied' : name}
      </span>
    </button>
  )
}

// ─── Main story ───────────────────────────────────────────────────────────────

function IconsPage() {
  const [search, setSearch] = useState('')
  const [variant, setVariant] = useState<Variant>('Linear')
  const [size, setSize] = useState<IconSize>(24)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const allIconsaxCategories = Object.keys(CATEGORIES)

  const ICON_ALIASES: Record<string, string[]> = {
    // Essential
    'Add': ['plus', 'new', 'create'],
    'AddSquare': ['plus', 'new', 'create'],
    'AddCircle': ['plus', 'new', 'create'],
    'ArchiveBox': ['box', 'storage'],
    'BatteryCharging': ['power', 'charge'],
    'Broom': ['clean', 'clear', 'wipe'],
    'Bubble': ['comment', 'chat', 'talk'],
    'Cake': ['birthday', 'food', 'dessert'],
    'CloseCircle': ['exit', 'x', 'cancel', 'remove'],
    'CloseSquare': ['exit', 'x', 'cancel', 'remove'],
    'Coffee': ['cup', 'drink', 'cafe'],
    'Crown': ['king', 'queen', 'leader'],
    'Danger': ['warning', 'alert', 'error'],
    'Diamonds': ['gem', 'jewel', 'crystal'],
    'EmojiHappy': ['smile', 'face', 'good'],
    'EmojiNormal': ['meh', 'face', 'neutral'],
    'EmojiSad': ['frown', 'face', 'bad'],
    'Filter': ['funnel', 'sort'],
    'Flag': ['marker', 'country', 'report'],
    'Flash': ['lightning', 'bolt', 'power'],
    'Forbidden': ['no', 'stop', 'denied', 'prohibited'],
    'Ghost': ['creepy', 'halloween', 'spectre'],
    'HambergerMenu': ['menu', 'options', 'nav', 'navigation'],
    'Home': ['house', 'building', 'main'],
    'Home2': ['house', 'building', 'main'],
    'InfoCircle': ['information', 'details', 'about'],
    'Information': ['details', 'about'],
    'Judge': ['law', 'court', 'gavel'],
    'Lamp': ['light', 'idea', 'bulb'],
    'Minus': ['subtract', 'remove', 'decrease'],
    'MinusCirlce': ['subtract', 'remove', 'decrease'],
    'MinusSquare': ['subtract', 'remove', 'decrease'],
    'MoreCircle': ['dots', 'options', 'extra', 'etc'],
    'MoreSquare': ['dots', 'options', 'extra', 'etc'],
    'Pet': ['animal', 'dog', 'cat'],
    'Send': ['share', 'submit', 'send-alt', 'plane'],
    'Send2': ['share', 'submit', 'send-alt', 'plane'],
    'Share': ['connect', 'social', 'network'],
    'Signpost': ['direction', 'road', 'path'],
    'Slider': ['settings', 'controls', 'adjust'],
    'SmartHome': ['iot', 'connected', 'house'],
    'Sort': ['order', 'arrange', 'filter'],
    'Sound': ['volume', 'audio', 'music'],
    'Speedometer': ['gauge', 'dashboard', 'fast'],
    'Status': ['state', 'condition', 'progress'],
    'Sticker': ['emoticon', 'badge'],
    'TickCircle': ['check', 'success', 'done', 'ok', 'yes'],
    'TickSquare': ['check', 'success', 'done', 'ok', 'yes'],
    'Trash': ['delete', 'bin', 'remove', 'junk', 'garbage'],
    'TrushSquare': ['delete', 'bin', 'remove', 'junk', 'garbage'],
    'Verify': ['check', 'certified', 'badge', 'seal'],
    'Warning2': ['danger', 'alert', 'error', 'caution'],
    'Wifi': ['internet', 'connection', 'wireless'],

    // Arrow
    'ArrowDown': ['downward', 'scroll', 'bottom'],
    'ArrowUp': ['upward', 'scroll', 'top', 'c-up'],
    'ArrowLeft': ['back', 'previous', 'c-left'],
    'ArrowRight': ['forward', 'next', 'c-right'],
    'ArrowSwapHorizontal': ['transfer', 'switch'],
    'Export': ['upload', 'share', 'upload-alt'],
    'Import': ['download', 'save', 'download-alt'],
    'Login': ['signin', 'enter', 'access'],
    'Logout': ['signout', 'exit', 'leave'],
    'Refresh': ['reload', 'sync', 'cycle', 'redo', 'update'],
    'Repeat': ['loop', 'again', 'replay'],
    'Back': ['previous', 'return'],
    
    // Users
    'People': ['group', 'team', 'users'],
    'Profile': ['user', 'person', 'account', 'avatar'],
    'Profile2User': ['user', 'person', 'account', 'avatar'],
    'User': ['person', 'profile', 'account', 'avatar'],
    'UserAdd': ['new-user', 'register', 'signup'],
    'UserRemove': ['delete-user', 'unregister'],
    'UserEdit': ['update-user', 'modify-user'],
    'UserSearch': ['find-user'],
    
    // Security
    'Eye': ['show', 'visible', 'view', 'reveal'],
    'EyeSlash': ['hide', 'hidden', 'unview', 'conceal'],
    'Key': ['password', 'secret', 'access'],
    'Lock': ['secure', 'password', 'private', 'admin'],
    'Unlock': ['insecure', 'open', 'public'],
    'Shield': ['security', 'protection', 'guard'],
    'Scan': ['qr', 'barcode'],
    
    // Call
    'Call': ['phone', 'telephone'],
    'CallCalling': ['phone', 'telephone', 'outgoing'],
    'CallIncoming': ['phone', 'telephone', 'incoming'],
    
    // Location
    'Global': ['world', 'earth', 'international'],
    'Gps': ['location', 'navigation', 'maps'],
    'Location': ['marker', 'pin', 'place'],
    'Map': ['atlas', 'directions', 'navigation'],
    'Radar': ['scan', 'sonar'],
    'Routing': ['directions', 'navigation', 'path'],

    // Emails, Messages
    'Message': ['chat', 'comment', 'discussion'],
    'Messages1': ['chat', 'comment', 'discussion'],
    'Sms': ['text', 'message'],
    'DirectSend': ['send', 'dm'],
    
    // Money
    'Card': ['credit', 'debit', 'payment'],
    'Coin': ['money', 'cash', 'currency'],
    'DollarCircle': ['money', 'cash', 'currency'],
    'Wallet': ['money', 'cash', 'purse'],
    'Receipt': ['invoice', 'bill', 'proof'],
    'Ticket': ['pass', 'entry', 'coupon'],
    
    // Shop
    'Bag': ['shopping', 'purchase', 'cart'],
    'ShoppingBag': ['shopping', 'purchase', 'cart'],
    'ShoppingCart': ['shopping', 'purchase', 'cart'],
    'Shop': ['store', 'market', 'booth'],
    
    // Delivery
    'Box': ['package', 'container', 'parcel'],
    'Truck': ['delivery', 'lorry', 'shipping'],

    // Settings
    'Setting': ['options', 'preferences', 'gear', 'config'],
    'Settings': ['options', 'preferences', 'gear', 'config'],
    'ToggleOn': ['switch', 'active', 'enabled'],
    'ToggleOff': ['switch', 'inactive', 'disabled'],
    
    // Search
    'SearchNormal1': ['find', 'look', 'magnifying-glass'],
    'SearchNormal': ['find', 'look', 'magnifying-glass'],
    'SearchZoomIn': ['magnify', 'enlarge'],
    'SearchZoomOut': ['shrink', 'reduce'],
    
    // Files
    'Folder': ['directory', 'files'],
    
    // Content-Edit
    'ArchiveBook': ['books', 'library', 'reading'],
    'Bill': ['invoice', 'receipt'],
    'Clipboard': ['copy', 'paste', 'notes', 'document'],
    'Document': ['file', 'page', 'text'],
    'Edit': ['modify', 'update', 'change', 'pencil'],
    'Edit2': ['modify', 'update', 'change', 'pencil'],
    'Note': ['document', 'file', 'page', 'memo'],
    'Stickynote': ['memo', 'post-it'],
    'Task': ['todo', 'checklist', 'done', 'assignment'],
    
    // Support & Like
    'Heart': ['love', 'like', 'favorite', 'favourite'],
    'Like': ['thumb-up', 'approve', 'agree'],
    'Dislike': ['thumb-down', 'disapprove', 'disagree'],
    'MagicStar': ['wizard', 'spell', 'trick'],
    'Medal': ['award', 'prize', 'winner'],
    'Star': ['favorite', 'rating', 'bookmark', 'favourite'],
    
    // Time
    'Calendar': ['date', 'month', 'year', 'event'],
    'Clock': ['time', 'watch', 'hour', 'minute'],
    'Timer': ['stopwatch', 'countdown'],
    
    // Video & Media
    'Camera': ['photo', 'picture', 'image', 'capture'],
    'Gallery': ['images', 'photos', 'album'],
    'Image': ['photo', 'picture'],
    'Microphone': ['record', 'audio', 'voice'],
    'Music': ['song', 'audio', 'sound'],
    'Next': ['forward', 'skip'],
    'Previous': ['backward', 'rewind'],
    'Play': ['start', 'run', 'begin', 'c-play'],
    'Pause': ['stop', 'hold', 'c-pause'],
    'Stop': ['end', 'finish'],
    'Video': ['movie', 'film', 'clip'],
    'VolumeHigh': ['sound', 'audio', 'music', 'loud'],
    'VolumeSlash': ['mute', 'no-sound', 'silent'],
    
    // Design Tools
    'Brush': ['paint', 'draw', 'art'],
    'Bucket': ['fill', 'color'],
    'Copy': ['duplicate', 'clone'],
    'Eraser': ['delete', 'remove', 'clear'],
    'Layer': ['stack', 'level'],
    'PenTool': ['draw', 'vector', 'path'],
    'Ruler': ['measure', 'size'],
    'Scissor': ['cut', 'trim'],
    'Shapes': ['geometry', 'forms'],
    
    // Grid & Layout
    'AlignLeft': ['justify-left'],
    'AlignRight': ['justify-right'],
    'AlignBottom': ['justify-bottom'],
    'AlignTop': ['justify-top'],
    'AlignHorizontally': ['justify-center-h'],
    'AlignVertically': ['justify-center-v'],
    'Crop': ['trim', 'cut'],
    'ElementPlus': ['add-element'],
    'Grid': ['layout', 'table'],
    'Maximize': ['fullscreen', 'expand', 'enlarge'],
    'RotateLeft': ['turn-left', 'counter-clockwise'],
    'RotateRight': ['turn-right', 'clockwise'],
    
    // Devices
    'Airdrop': ['share', 'send'],
    'Bluetooth': ['wireless', 'connection'],
    'Cloud': ['storage', 'online', 'backup', 'sky', 'overcast', 'weather'],
    'Cpu': ['processor', 'chip', 'computer'],
    'Devices': ['gadgets', 'electronics'],
    'Driver': ['software', 'hardware'],
    'Game': ['controller', 'playstation', 'xbox'],
    'Headphone': ['audio', 'music', 'earphones'],
    'Keyboard': ['typing', 'input'],
    'Microscope': ['science', 'zoom', 'magnify'],
    'Mobile': ['phone', 'cellphone', 'smartphone'],
    'Monitor': ['screen', 'display', 'tv'],
    'Mouse': ['clicker', 'pointer'],
    'Printer': ['print', 'fax'],
    'Ram': ['memory', 'computer'],
    'Simcard': ['phone', 'mobile'],
    'Speaker': ['audio', 'sound', 'music'],
    'Watch': ['timepiece', 'smartwatch'],
    
    // Weather
    'Drop': ['rain', 'water', 'liquid'],
    'Moon': ['night', 'lunar'],
    'Sun': ['day', 'sunny', 'light'],
    'Wind': ['breeze', 'gale'],
    
    // Building
    'Bank': ['money', 'finance', 'building'],
    'Building': ['office', 'apartments', 'structure'],
    'Buildings': ['cityscape', 'skyline'],
    'Courthouse': ['law', 'justice', 'gavel'],
    'Hospital': ['doctor', 'medical', 'health'],
    'House': ['home', 'residence', 'building'],
    
    // School
    'Award': ['trophy', 'prize', 'rosette'],
    'Book': ['reading', 'novel', 'textbook'],
    'Bookmark': ['save', 'marker'],
    'Briefcase': ['work', 'bag', 'portfolio'],
    'Calculator': ['math', 'numbers'],
    'Gift': ['present', 'box', 'birthday'],
    'Notepad': ['notes', 'writing', 'memo'],
    'Teacher': ['professor', 'instructor', 'school'],
    
    // Notifications
    'Notification': ['alert', 'bell', 'alarm'],
    
    // Type
    'Link': ['url', 'chain', 'connect'],
    'Paperclip': ['attachment', 'file'],
    'QuoteDown': ['quotation', 'cite'],
    'QuoteUp': ['quotation', 'cite'],
    'Text': ['font', 'words', 'letters'],
    'TextBold': ['strong', 'emphasis'],
    'TextItalic': ['emphasis', 'oblique'],
    'TextUnderline': ['highlight'],
    'Translate': ['language', 'dictionary'],
    
    // Programing
    'Code': ['develop', 'script', 'programming'],
    'Command': ['terminal', 'console', 'cli'],
    'Data': ['database', 'storage', 'server'],
    'Hashtag': ['tag', 'pound', 'social'],
    'Hierarchy': ['structure', 'organization', 'tree'],
    'Scroll': ['navigate', 'browse'],
    'SidebarLeft': ['panel-left', 'drawer'],
    'SidebarRight': ['panel-left', 'drawer'],
    
    // Car
    'Airplane': ['flight', 'plane', 'travel'],
    'Bus': ['transport', 'vehicle'],
    'Car': ['vehicle', 'auto', 'automobile'],
    'Driving': ['steering-wheel', 'road'],
    'GasStation': ['fuel', 'petrol', 'pump'],
    'Ship': ['boat', 'vessel', 'maritime'],
  }

  const brandFiltered = useMemo(() => {
    const q = search.toLowerCase().trim()
    const result: Record<string, any[]> = {}
    for (const [cat, icons] of Object.entries(BRAND_ICONS)) {
      // If searching, ignore activeCategory for matching
      if (!q && activeCategory && activeCategory !== 'Brand Icons' && activeCategory !== cat) continue
      
      const matches = q
        ? icons.filter(i => i.name.toLowerCase().includes(q))
        : icons
      if (matches.length > 0) result[cat] = matches
    }
    return result
  }, [search, activeCategory])

  const iconsaxFiltered = useMemo(() => {
    const q = search.toLowerCase().trim()
    const result: Record<string, string[]> = {}
    for (const [cat, icons] of Object.entries(CATEGORIES)) {
      // If searching, ignore activeCategory for matching
      if (!q && activeCategory && activeCategory !== 'Iconsax' && cat !== activeCategory) continue
      
      const matches = q
        ? icons.filter(n => {
            const lowerName = n.toLowerCase()
            if (lowerName.includes(q)) return true
            const aliases = ICON_ALIASES[n] || []
            return aliases.some(alias => alias.toLowerCase().includes(q))
          })
        : icons
      if (matches.length > 0) result[cat] = matches
    }
    return result
  }, [search, activeCategory])

  const totalBrand = Object.values(brandFiltered).reduce((s, arr) => s + arr.length, 0)
  const totalIconsax = Object.values(iconsaxFiltered).reduce((s, arr) => s + arr.length, 0)
  const totalVisible = totalBrand + totalIconsax

  return (
    <div className="p-8 max-w-6xl">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Icons</h2>
        <p className="text-sm mt-1 opacity-60 max-w-xl" style={{ color: 'var(--text)' }}>
          Brand-specific icons and the full Iconsax library (993 icons).
          Click any icon to copy its name.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search icons…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-border rounded-lg px-3 py-2 text-sm bg-bg w-56 outline-none focus:ring-2"
          style={{ color: 'var(--text)', '--tw-ring-color': 'var(--border)' } as React.CSSProperties}
        />

        {/* Variant */}
        <div className="flex rounded-lg border border-border overflow-hidden">
          {VARIANTS.map(v => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className="px-3 py-2 text-xs transition-colors"
              style={{
                backgroundColor: variant === v ? 'var(--text)' : 'var(--bg)',
                color: variant === v ? 'var(--bg)' : 'var(--text)',
              }}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Size */}
        <div className="flex rounded-lg border border-border overflow-hidden">
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className="px-3 py-2 text-xs transition-colors"
              style={{
                backgroundColor: size === s ? 'var(--text)' : 'var(--bg)',
                color: size === s ? 'var(--bg)' : 'var(--text)',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <span className="text-xs opacity-40 ml-auto" style={{ color: 'var(--text)' }}>
          {totalVisible} icons
        </span>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className="px-3 py-1 rounded-full text-xs border transition-colors"
          style={{
            backgroundColor: activeCategory === null ? 'var(--text)' : 'transparent',
            color: activeCategory === null ? 'var(--bg)' : 'var(--text)',
            borderColor: 'var(--border)',
          }}
        >
          All
        </button>
        <button
          onClick={() => setActiveCategory('Brand Icons')}
          className="px-3 py-1 rounded-full text-xs border transition-colors"
          style={{
            backgroundColor: activeCategory === 'Brand Icons' ? 'var(--text)' : 'transparent',
            color: activeCategory === 'Brand Icons' ? 'var(--bg)' : 'var(--text)',
            borderColor: 'var(--border)',
          }}
        >
          Brand Icons
        </button>
        <button
          onClick={() => setActiveCategory('Iconsax')}
          className="px-3 py-1 rounded-full text-xs border transition-colors"
          style={{
            backgroundColor: activeCategory === 'Iconsax' ? 'var(--text)' : 'transparent',
            color: activeCategory === 'Iconsax' ? 'var(--bg)' : 'var(--text)',
            borderColor: 'var(--border)',
          }}
        >
          Iconsax
        </button>
        
        {/* Separator if needed */}
        <div className="w-px h-6 bg-border mx-1 self-center" />

        {allIconsaxCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className="px-3 py-1 rounded-full text-xs border transition-colors"
            style={{
              backgroundColor: activeCategory === cat ? 'var(--text)' : 'transparent',
              color: activeCategory === cat ? 'var(--bg)' : 'var(--text)',
              borderColor: 'var(--border)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Brand Icons Grid */}
      {Object.entries(brandFiltered).map(([cat, icons]) => (
        <div key={cat} className="mb-10">
          <h3
            className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50"
            style={{ color: 'var(--text)' }}
          >
            {cat} <span className="font-normal normal-case tracking-normal">({icons.length})</span>
          </h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-1">
            {icons.map(icon => (
              <IconCell key={icon.name} name={icon.name} variant={variant} size={size} BrandIcon={icon.Icon} />
            ))}
          </div>
        </div>
      ))}

      {/* Iconsax Grid */}
      {search.trim() ? (
        totalIconsax > 0 && (
          <div className="mb-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50" style={{ color: 'var(--text)' }}>
              Iconsax Results <span className="font-normal normal-case tracking-normal">({totalIconsax})</span>
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-1">
              {Object.values(iconsaxFiltered).flat().map(name => (
                <IconCell key={name} name={name} variant={variant} size={size} />
              ))}
            </div>
          </div>
        )
      ) : (
        Object.entries(iconsaxFiltered).map(([cat, icons]) => (
          <div key={cat} className="mb-10">
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50"
              style={{ color: 'var(--text)' }}
            >
              {cat} <span className="font-normal normal-case tracking-normal">({icons.length})</span>
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-1">
              {icons.map(name => (
                <IconCell key={name} name={name} variant={variant} size={size} />
              ))}
            </div>
          </div>
        ))
      )}

      {totalVisible === 0 && (
        <p className="text-sm opacity-40 mt-12 text-center" style={{ color: 'var(--text)' }}>
          No icons match "{search}"
        </p>
      )}

      {/* Usage example */}
      <div
        className="mt-12 p-6 rounded-card border border-border"
        style={{ backgroundColor: 'var(--bg-2)' }}
      >
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Usage</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-semibold mb-2 opacity-60" style={{ color: 'var(--text)' }}>Brand Icons</h4>
            <pre className="text-xs leading-relaxed overflow-auto" style={{ color: 'var(--text)', opacity: 0.8 }}>
{`import { MurfyLogo } from './Atoms/BrandIcons/MurfyLogo'
import { Facebook } from './Atoms/Icons/Facebook'

<MurfyLogo width={40} height={40} />
<Facebook width={24} height={24} />`}
            </pre>
          </div>
          <div>
            <h4 className="text-xs font-semibold mb-2 opacity-60" style={{ color: 'var(--text)' }}>Iconsax</h4>
            <pre className="text-xs leading-relaxed overflow-auto" style={{ color: 'var(--text)', opacity: 0.8 }}>
{`import { Home, SearchNormal1 } from 'iconsax-react'

// variant: 'Linear' | 'Bold' | 'Broken' | 'Bulk' | 'Outline' | 'TwoTone'
<Home size={24} variant="Linear" />
<SearchNormal1 size={20} variant="Bold" />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Overview: Story = {
  render: () => <IconsPage />,
}

export const BrandLogo: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Murfy Logo</h3>
      <MurfyLogo width={120} height={120} style={{ color: 'var(--text)' }} />
    </div>
  )
}

export const SocialIcons: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div className="flex flex-col items-center gap-6">
      <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Social Icons</h3>
      <div className="flex gap-4">
        {BRAND_ICONS['Social Icons'].map(({ name, Icon }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div className="p-4 rounded-lg bg-bg-2 border border-border">
              <Icon width={32} height={32} style={{ color: 'var(--text)' }} />
            </div>
            <span className="text-[10px] opacity-60" style={{ color: 'var(--text)' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const UIIcons: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div className="flex flex-col items-center gap-6">
      <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>UI Icons</h3>
      <div className="flex gap-4">
        {BRAND_ICONS['UI Icons'].map(({ name, Icon }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div className="p-4 rounded-lg bg-bg-2 border border-border">
              <Icon width={24} height={24} style={{ color: 'var(--text)' }} />
            </div>
            <span className="text-[10px] opacity-60" style={{ color: 'var(--text)' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
