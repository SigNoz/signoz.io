import React from 'react'

export const ArrowRightSolid = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="20"
      height="20"
      className="min-w-5 fill-signoz_robin-500"
    >
      <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z" />
    </svg>
  )
}

export const CircleCheckSolid = ({ color = 'fill-signoz_robin-500' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="20"
      height="20"
      className={`${color} min-w-5`}
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
    </svg>
  )
}

export const CircleInfoSolid = ({ height = '20', width = '20' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className="min-w-5"
    >
      <g clipPath="url(#clip0_2663_8479)">
        <path
          d="M9.99996 18.3346C14.6023 18.3346 18.3333 14.6037 18.3333 10.0013C18.3333 5.39893 14.6023 1.66797 9.99996 1.66797C5.39759 1.66797 1.66663 5.39893 1.66663 10.0013C1.66663 14.6037 5.39759 18.3346 9.99996 18.3346Z"
          fill="#62687C"
          stroke="#62687C"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99996 14.168V9.16797H7.91663"
          stroke="#121317"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 5.83472H10.0083"
          stroke="#121317"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2663_8479">
          <rect width="20" height="20" fill="white" transform="translate(0 0.00134277)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const ZapSolid = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="min-w-5"
    >
      <g clipPath="url(#clip0_2623_7333)">
        <path
          d="M10.8333 1.66803L2.5 11.668H10L9.16667 18.3347L17.5 8.3347H10L10.8333 1.66803Z"
          fill="#F24769"
          stroke="#F24769"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2623_7333">
          <rect width="20" height="20" fill="white" transform="translate(0 0.00134277)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const ClockSolid = ({ height = '20', width = '20' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className="min-w-5"
    >
      <g clipPath="url(#clip0_2605_6510)">
        <path
          d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
          fill="#62687C"
          stroke="#62687C"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 5V10L13.3333 11.6667"
          stroke="#121317"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2605_6510">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const CheckSolid = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="15"
      height="15"
      className="fill-signoz_robin-500"
    >
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  )
}

export const CrossSolid = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 16" fill="none">
      <path
        d="M11.25 4.25L3.75 11.75M3.75 4.25L11.25 11.75"
        stroke="#E5484D"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const FlameSolid = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 16"
      fill="none"
      className="min-w-5"
    >
      <path
        d="M5.3125 9.5625C5.7269 9.5625 6.12433 9.39788 6.41735 9.10485C6.71038 8.81183 6.875 8.4144 6.875 8C6.875 7.1375 6.5625 6.75 6.25 6.125C5.58 4.78562 6.11 3.59125 7.5 2.375C7.8125 3.9375 8.75 5.4375 10 6.4375C11.25 7.4375 11.875 8.625 11.875 9.875C11.875 10.4495 11.7618 11.0184 11.542 11.5492C11.3221 12.08 10.9998 12.5623 10.5936 12.9686C10.1873 13.3748 9.70504 13.6971 9.17424 13.917C8.64344 14.1368 8.07453 14.25 7.5 14.25C6.92547 14.25 6.35656 14.1368 5.82576 13.917C5.29496 13.6971 4.81266 13.3748 4.40641 12.9686C4.00015 12.5623 3.67789 12.08 3.45803 11.5492C3.23816 11.0184 3.125 10.4495 3.125 9.875C3.125 9.15438 3.39563 8.44125 3.75 8C3.75 8.4144 3.91462 8.81183 4.20765 9.10485C4.50067 9.39788 4.8981 9.5625 5.3125 9.5625Z"
        fill="#F24769"
        stroke="#F24769"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const CloudSolid = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 16"
      fill="none"
      className="min-w-5"
    >
      <path
        d="M10.9375 12.375H5.62498C4.81364 12.3748 4.01835 12.149 3.32796 11.7228C2.63758 11.2966 2.0793 10.6868 1.71552 9.96163C1.35174 9.23643 1.19679 8.42435 1.26797 7.61614C1.33916 6.80793 1.63368 6.03544 2.11863 5.38499C2.60358 4.73454 3.25985 4.23175 4.0141 3.9328C4.76836 3.63386 5.59088 3.55055 6.38976 3.69217C7.18864 3.83378 7.9324 4.19476 8.53794 4.73475C9.14347 5.27475 9.58692 5.97249 9.81873 6.75H10.9375C11.6834 6.75 12.3988 7.04632 12.9262 7.57376C13.4537 8.10121 13.75 8.81658 13.75 9.5625C13.75 10.3084 13.4537 11.0238 12.9262 11.5512C12.3988 12.0787 11.6834 12.375 10.9375 12.375Z"
        fill="#7190F9"
        stroke="#7190F9"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ServerSolid = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className="min-w-5"
    >
      <g clipPath="url(#clip0_2605_7148)">
        <path
          d="M12.5 1.25H2.5C1.80964 1.25 1.25 1.80964 1.25 2.5V5C1.25 5.69036 1.80964 6.25 2.5 6.25H12.5C13.1904 6.25 13.75 5.69036 13.75 5V2.5C13.75 1.80964 13.1904 1.25 12.5 1.25Z"
          fill="#BD9979"
          stroke="#BD9979"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 8.75H2.5C1.80964 8.75 1.25 9.30964 1.25 10V12.5C1.25 13.1904 1.80964 13.75 2.5 13.75H12.5C13.1904 13.75 13.75 13.1904 13.75 12.5V10C13.75 9.30964 13.1904 8.75 12.5 8.75Z"
          fill="#BD9979"
          stroke="#BD9979"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 3.75H3.75625"
          stroke="#0B0C0E"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 11.25H3.75625"
          stroke="#0B0C0E"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2605_7148">
          <rect width="15" height="15" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
