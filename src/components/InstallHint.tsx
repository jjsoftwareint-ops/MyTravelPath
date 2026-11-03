import { IoClose, IoShareOutline } from 'react-icons/io5'
import { MdAddToHomeScreen, MdMoreVert } from 'react-icons/md'
import { hideInstallHint, promptInstall, useInstallHint } from '../install'

// Above the footer on phones, from the second visit on: how to put the site on the home screen.
// iPhone: the share sheet. Android: Chrome's own install sheet when it offers one, else the menu.
export default function InstallHint() {
  const hint = useInstallHint()
  if (!hint.show) return null
  return (
    <aside className="install-hint" aria-label="Add to Home Screen">
      <MdAddToHomeScreen className="install-hint-icon" aria-hidden="true" />
      <p>
        {hint.platform === 'ios' ? (
          <>
            Keep My Travel Path on your phone: tap{' '}
            <IoShareOutline className="install-hint-inline" aria-label="Share" /> then{' '}
            <b>Add to Home Screen</b>.
          </>
        ) : hint.canPrompt ? (
          <>
            Keep My Travel Path on your phone:{' '}
            <button type="button" className="install-hint-button" onClick={promptInstall}>
              Add to Home screen
            </button>
          </>
        ) : (
          <>
            Keep My Travel Path on your phone: tap{' '}
            <MdMoreVert className="install-hint-inline" aria-label="Menu" /> then{' '}
            <b>Add to Home screen</b>.
          </>
        )}
      </p>
      <button type="button" className="install-hint-close" onClick={hideInstallHint} aria-label="Close">
        <IoClose aria-hidden="true" />
      </button>
    </aside>
  )
}
