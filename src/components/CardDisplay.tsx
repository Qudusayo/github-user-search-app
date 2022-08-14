import location from "./../assets/icon-location.svg";
import twitter from "./../assets/icon-twitter.svg";
import website from "./../assets/icon-website.svg";
import company from "./../assets/icon-company.svg";
import React from "react";
import moment from "moment";

interface CardDisplayProp {
  userData: any;
}

interface SpanViewProp {
  type: "website" | "twitter" | "location" | "company";
  value: string | null;
}

const CardDisplay: React.FC<CardDisplayProp> = ({ userData }) => {
  return (
    <div className="CardDisplay">
      <div className="CardDisplayHeader flex">
        <img src={userData.avatar_url} alt="octocat" />
        <div className="CardDisplayHeaderInfo">
          <div className="flex">
            <h1>
              {!!!userData.name ? userData.githubUsername : userData.name}
            </h1>
            <span>
              Joined {moment(userData.created_at).format("DD MMM YYYY")}
            </span>
          </div>
          <span className="CardDisplayHeaderInfoUsername">
            @{userData?.githubUsername?.toLowerCase()}
          </span>
          <p>{userData.bio ? userData.bio : "This profile has no bio"}</p>
        </div>
      </div>
      <div className="CardDisplayData">
        <div className="CardDisplayDataFollowers flex">
          <div>
            <span>Repos</span>
            <h2>{userData.public_repos}</h2>
          </div>
          <div>
            <span>Followers</span>
            <h2>{userData.followers}</h2>
          </div>
          <div>
            <span>Following</span>
            <h2>{userData.following}</h2>
          </div>
        </div>
        <div className="CardDisplayDataLinks">
          <SpanView type="location" value={userData.location} />
          <SpanView
            type="twitter"
            value={userData.twitter_username && "@" + userData.twitter_username}
          />
          <SpanView type="website" value={userData.blog} />
          <SpanView type="company" value={userData.company} />
        </div>
      </div>
    </div>
  );
};

const iconTypes = {
  website,
  twitter,
  location,
  company,
};
function SpanView(props: SpanViewProp) {
  function shorten(value: string) {
    let cutout = value.slice(0, 20);
    return cutout.length === 20 ? cutout + "..." : cutout;
  }

  function defineUrl(content: SpanViewProp) {
    if (content.value) {
      switch (content.type) {
        case "company":
          return `https://github.com/${content.value.slice(1)}`;
        case "twitter":
          return `https://twitter.com/${content.value}`;
        default:
          return content.value;
      }
    }
  }

  if (props.type === "location") {
    return (
      <div>
        <img src={iconTypes[props.type]} alt="website" />
        <span>{props.value ? shorten(props.value) : "Not available"}</span>
      </div>
    );
  } else {
    return (
      <div className={!!!props.value ? "blank" : ""}>
        <img src={iconTypes[props.type]} alt="website" />
        {!!props.value ? (
          <a target="_blank" rel="noreferrer" href={defineUrl(props)}>
            {shorten(props.value)}
          </a>
        ) : (
          <span>Not available</span>
        )}
      </div>
    );
  }
}

export default CardDisplay;
