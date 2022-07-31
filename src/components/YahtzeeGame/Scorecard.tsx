import {
  YahtzeeScorecard,
  YahtzeeScorecardValidated,
} from '@/lib/yahtzee/types';
import { UnstyledButton } from '@mantine/core';

interface ScorecardProps {
  scorecard: YahtzeeScorecard;
  scorecardValidated: YahtzeeScorecardValidated;
  handleScore: (_type: string) => void;
}

function Scorecard({
  scorecard,
  scorecardValidated,
  handleScore,
}: ScorecardProps) {
  return (
    <div>
      <div>
        <h1>Scorecard</h1>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(scorecard).map((key) => {
              const score = scorecard[key as keyof YahtzeeScorecard];
              const scoreValidated = scorecardValidated[key as keyof YahtzeeScorecardValidated];
              return (
                <UnstyledButton
                  component="tr"
                  key={key}
                  onClick={() => handleScore(key)}
                  style={{
                    backgroundColor: scoreValidated && !score ? 'green' : '',
                  }}
                //   disabled={scoreValidated}
                >
                  <td>{key}</td>
                  <td>{score != null ? score : ''}</td>
                </UnstyledButton>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Scorecard;
