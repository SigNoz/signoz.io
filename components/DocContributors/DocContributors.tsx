import React from 'react'
import Link from 'next/link'
import { Edit2, Clock } from 'lucide-react'
import styles from './DocContributors.module.css'

interface Contributor {
  login: string
  avatar_url: string
  html_url: string
}

interface LastEditor {
  name: string
  date: string
  avatar_url: string
  profile_url: string
}

interface DocContributorsProps {
  filePath: string
  contributors?: Contributor[]
  lastEditor?: LastEditor
}

const DocContributors: React.FC<DocContributorsProps> = ({ filePath, contributors = [], lastEditor }) => {
  const editUrl = `https://github.com/SigNoz/signoz-web/edit/main/${filePath}`

  return (
    <div className={styles.container}>
      <div className={styles.editSection}>
        <Link href={editUrl} target="_blank" className={styles.editLink}>
          <Edit2 size={16} />
          <span>Edit this page</span>
        </Link>
      </div>

      {lastEditor && (
        <div className={styles.lastEditorSection}>
          <div className={styles.lastEditorInfo}>
            <Clock size={14} />
            <span>Last updated by</span>
            <Link href={lastEditor.profile_url} target="_blank" className={styles.lastEditorLink}>
              <img
                src={lastEditor.avatar_url}
                alt={`${lastEditor.name}'s avatar`}
                className={styles.lastEditorAvatar}
              />
              <span className={styles.lastEditorName}>{lastEditor.name}</span>
            </Link>
            <span className={styles.lastEditDate}>on {lastEditor.date}</span>
          </div>
        </div>
      )}

      {contributors.length > 0 && (
        <div className={styles.contributorsSection}>
          <h4 className={styles.contributorsTitle}>Contributors</h4>
          <div className={styles.contributorsList}>
            {contributors.map((contributor) => (
              <Link
                key={contributor.login}
                href={contributor.html_url}
                target="_blank"
                className={styles.contributorLink}
              >
                <img
                  src={contributor.avatar_url}
                  alt={`${contributor.login}'s avatar`}
                  className={styles.contributorAvatar}
                />
                <span className={styles.contributorName}>{contributor.login}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DocContributors 