// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    maxWidth: string;
    font: {
      default: string;
    };
    borderColor: {
      dangerZone: string;
    };
    bgColor: {
      body: string;
      select: string;
      notificationIcon: string;
      notificationCount: string;
      skeleton: string;
      greenBtn: string;
      blueBtn: string;
      redBtn: string;
      grayBtn: string;
    };
    color: {
      logo: string;
      logo_similar: string;
      black: string;
      white: string;
      red: string;
    };
    size: {
      headerProfileImage: string;
    };
  }
}
