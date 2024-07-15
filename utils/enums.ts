export enum UserGroups {
  ADMIN = 1,
  MODERATOR = 2,
  PRO = 3,
  CREATOR = 11,
  FOLLOWER = 14,
  NOTIFICATION_SUBSCRIBER = 16,
  FREEPRO = 17
}

export enum PostVisibility {
  free,
  paid,
  follow
}

export enum PostStatus {
  drafts,
  published
}

export enum CommentStatus {
  pending = 0,
  approved = 1,
  removed = 2
}

export enum DefaultUserCountry {
  unlisted = 'US',
  unknown = 'IN'
}

export enum CountryCurrency {
  IN = 'INR',
  US = 'USD',
  AT = 'EUR', // Austria
  BE = 'EUR', // Belgium
  CY = 'EUR', // Cyprus
  EE = 'EUR', // Estonia
  FI = 'EUR', // Finland
  FR = 'EUR', // France
  DE = 'EUR', // Germany
  GR = 'EUR', // Greece
  IE = 'EUR', // Ireland
  IT = 'EUR', // Italy
  LV = 'EUR', // Latvia
  LT = 'EUR', // Lithuania
  LU = 'EUR', // Luxembourg
  MT = 'EUR', // Malta
  NL = 'EUR', // Netherlands
  PT = 'EUR', // Portugal
  SK = 'EUR', // Slovakia
  SL = 'EUR', // Slovenia
  ES = 'EUR', // Spain
  ME = 'EUR', // Montenegro
  XK = 'EUR', // Kosovo
  AD = 'EUR', // Andorra
  MC = 'EUR', // Monaco
  SM = 'EUR', // San Marino
  VA = 'EUR', // Vaitcan City
  BL = 'EUR', // Saint Barthélemy
  MF = 'EUR', // Saint Martin
  PM = 'EUR', // Saint Pierre and Miquelon
  TF = 'EUR', // French Southern and Antarctic Lands
  GB = 'EUR', // England
  SE = 'EUR', // Sweden
  RO = 'EUR', // Romania
  PO = 'EUR', // Poland
  HU = 'EUR', // Hungary
  CZ = 'EUR', // Czech Republic
  DK = 'EUR', // Denmark
  BG = 'EUR', // Bulgaria
  HR = 'EUR' // Croatia
}

export enum CurrencySymbol {
  INR = '₹',
  USD = '$',
  EUR = '€'
}

export enum RegistrationOption {
  createAccount = 'Create Account',
  signin = 'Signin',
  reset = 'Reset Password',
  sentEmail = 'Sent Email',
  addEmail = 'Add Email',
  customDomain = 'customDomain'
}

// Mostly used for "title, subtitle" and "redirect logic" customisations
export enum AuthContext {
  direct = 'direct',
  sessionExpired = 'sessionExpired',
  savePost = 'savePost',
  purchasePost = 'purchasePost',
  follow = 'follow',
  postFloatingComment = 'postFloatingComment',
  belowPostComment = 'belowPostComment',
  generateImages = 'generateImages',
  marketingPage = 'marketingPage',
  purchaseBulkPosts = 'purchaseBulkPosts',
  pro = 'pro'
}

export enum PostAccess {
  granted,
  paymentRequired,
  signInRequired,
  signInAndPaymentRequired
}

export enum domesticPriceLimit {
  min = 10,
  max = 1000
}

export enum internationalPriceLimit {
  min = 1,
  max = 100
}

export enum AuthStage {
  AUTH_OPTION,
  USERNAME_PENDING,
  AUTH_FORM,
  EMAILVERIFICATION,
  MOBILEVERIFICATION,
  WAITLIST
}

export enum OnboardingStatus {
  created = 0,
  sentEmailVerification = 1,
  sentMobileVerification = 2
}

export enum StatsAndEarningsOption {
  stats = 'Stats',
  earnings = 'Earnings'
}

export enum WelcomeStep {
  chooseIdentity,
  addSocials,
  makeMoney,
  enableSupport,
  supportEnabledMsg,
  proIntro,
  proByInvite
}

export enum WelcomeModalContainerClasses {
  chooseIdentity = 'choose-identity-step',
  addSocials = 'add-socials-step',
  makeMoney = 'make-money-step',
  enableSupport = 'enable-support-step',
  supportEnabledMsg = 'enabled-support-step',
  proIntro = 'enable-support-step'
}

export enum OnboardingGuideStep {
  writeFirstPost,
  sellPost,
  addMedia,
  sharePost,
  makeDG
}

export enum PaymentPurpose {
  support,
  post,
  nft,
  bulk,
  pro
}

export enum ShareTypes {
  supporter,
  creator
}

export enum SupportFeatureStatus {
  disabled,
  enabled,
  suspended
}

export enum HomeDiscoverSegment {
  creations = 'creations',
  creators = 'creators'
}

export enum PostTypes {
  blog = 'blog',
  parent = 'parent',
  chapter = 'chapter',
  dg = 'dg',
  episode = 'episode'
}

export enum PostSubtypes {
  rich = 'rich',
  audio = 'audio',
  video = 'video',
  image = 'image',
  document = 'document',
  other = 'other',
  story = 'story',
  comic = 'comic'
}

export enum PostParentChildMap {
  story = 'chapter',
  comic = 'episode'
}

export enum PostChildParentMap {
  chapter = 'story',
  episode = 'comic'
}

export enum SocialAbbr {
  'facebook' = 'fb',
  'twitter' = 'tw',
  'instagram' = 'insta',
  'linkedin' = 'li',
  'website' = 'ws',
  'wattpad' = 'wattpad'
}

export enum SocialValidation {
  'twitter' = '(twitter|t|twttr).(com|co)',
  'instagram' = '(instagram|ig).(com)',
  'facebook' = '(facebook|fb).(com)',
  'linkedin' = '(linkedin).(com|at)',
  'website' = ''
}

export enum PromptKeys {
  pro = 'proIntro',
  follow = 'followPrompt',
  notification = 'notificationPrompt',
  invite = 'invitePrompt',
  aiIllustrate = 'aiIllustrate',
  aiIllustrateCount = 'aiIllustrateCount',
  trialAndPro = 'trialAndPro'
}

export enum PostSubtypeLabels {
  image = 'Photo',
  document = 'E-Book',
  video = 'Video',
  audio = 'Audio',
  other = 'Other',
  rich = 'Post',
  story = 'Story',
  comic = 'Comic'
}

export enum GoodiesKeys {
  AudioRecording = 'audio_recording',
  PersonalisedMessage = 'personalised_message',
  VirtualMeetup = 'virtual_meetup',
  Other = 'other'
}

export enum GoodiesTitles {
  'audio_recording' = 'Audio Recording',
  'personalised_message' = 'Personalised Message',
  'virtual_meetup' = 'Virtual Meetup',
  'other' = 'Other (Zip)'
}

export enum GoodiesSequence {
  'audio_recording' = 1,
  'personalised_message',
  'virtual_meetup',
  'other'
}

export enum CustomDomainStatus {
  pending = 0,
  activated = 1,
  failed = 2,
  suspended = 3
}

export enum DomainProvider {
  GoDaddy = 'GoDaddy',
  Namecheap = 'Namecheap',
  Other = 'Other'
}

export enum ProModalContext {
  picto,
  plotter,
  importEmail,
  customDomain,
  trialAndPro
}

export enum SubscriptionStatus {
  upcoming,
  active,
  expired,
  disabled
}

export enum SubscriptionKinds {
  paid = 0,
  promotional,
  referee,
  referrer,
  paid_with_trial
}

export enum ProWalkthroughSteps {
  intro,
  customDomain,
  importEmail,
  revenue,
  badge,
  picto,
  visualise
}

export enum PostShareContext {
  published,
  share
}

export enum UserDeviceStatuses {
  active = 0,
  inactive = 1
}

export enum OrderStatus {
  pending = 0,
  failed = 1,
  succeeded = 2
}

export enum CommenterTags {
  creator = 'creator',
  moderator = 'moderator'
}

export enum CommentBoxContext {
  belowPost,
  floating,
  animated
}
