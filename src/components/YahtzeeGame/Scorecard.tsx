import {
  YahtzeeScorecard,
  YahtzeeScorecardValidated,
} from '@/lib/yahtzee/types';

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
                <tr
                  key={key}
                  style={{
                    backgroundColor: scoreValidated && !score ? 'green' : 'inherit',
                  }}
                  onClick={() => handleScore(key)}
                >
                  <td>{key}</td>
                  <td>{score != null ? score : ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Scorecard;
