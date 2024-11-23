import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {
  FeedbackProfessorModalData,
  MentoriaData,
} from '@core/interfaces/models';
import { AlunoService } from '@core/services/aluno.service';
import { ProfessorService } from '@core/services/professor.service';
import { SessionService } from '@core/services/session.service';
import { MentoriaProfessorDetailsComponent } from '../../shared/components/mentoria-professor-details/mentoria-professor-details.component';
import { MentoriaStudentDetailsComponent } from '../../shared/components/mentoria-student-details/mentoria-student-details.component';
import { TokenHelper } from '@app/shared/helpers/token.helper';

@Component({
  selector: 'app-mentorias',
  templateUrl: './mentorias.component.html',
  styleUrls: ['./mentorias.component.scss'],
})
export class MentoriasComponent implements OnInit {
  openDialog: any;
  elementData: MentoriaData[] = [];
  userType: 'professor' | 'aluno' = 'aluno';
  userId: string;
  dataSource: MatTableDataSource<MentoriaData> = new MatTableDataSource(
    this.elementData
  );
  displayedColumns: string[];

  constructor(
    private alunoService: AlunoService,
    private professorService: ProfessorService,
    private dialog: MatDialog,
    private sessionService: SessionService
  ) {}

  async ngOnInit() {
    let dataString = await this.sessionService.getUserData()
    let dataUser = TokenHelper.parseUserData(dataString);
      this.userType = dataUser.perfil as 'professor' | 'aluno';
      this.userId = dataUser.id;
    let token = this.sessionService.getAccessToken();
    if (this.userType === 'aluno') {
      let response = await this.alunoService
        .getMentoriasFromAlunosById(this.userId, token)
        .toPromise();
      this.displayedColumns = ['professor', 'mentoria'];
      this.elementData = response.body.map((mentoria: MentoriaData) => {
        return {
          id: mentoria.id,
          mentoria: mentoria.mentoria,
          professor: mentoria.professor,
          sessoes: mentoria.sessoes,
          descricao: mentoria.descricao,
          dataInicio: mentoria.dataInicio,
          dataFim: mentoria.dataFim,
        };
      });
    } else {
      let response = await this.professorService
        .getMentoriasFromProfessorById(this.userId, token)
        .toPromise();
      this.displayedColumns = ['aluno', 'mentoria'];
      this.elementData = response.body.map((mentoria: MentoriaData) => {
        return {
          id: mentoria.id,
          mentoria: mentoria.mentoria,
          aluno: mentoria.aluno,
          sessoes: mentoria.sessoes,
        };
      });
    }
    this.dataSource = new MatTableDataSource(this.elementData);
  }

  onFirstAction(mentoria: any[]) {
    this.dialog.open(MentoriaStudentDetailsComponent, {
      width: '800px',
      data: { mentoria: mentoria },
    });
  }

  onSecondAction(mentoria: any[]) {
    this.openDialog = this.dialog.open(MentoriaProfessorDetailsComponent, {
      width: '800px',
      data: { mentoria: mentoria },
    });

    this.openDialog
      .afterClosed()
      .subscribe((result: FeedbackProfessorModalData) => {
        const updatedMentoria = this.elementData.find(
          (m) => m.id === result.mentoria.id && m.aluno === result.mentoria.aluno
        );
        if (updatedMentoria) {
          const sessaoToUpdate = updatedMentoria.sessoes.find(
            (s) => s.sessaoId === result.feedbackNovo.id
          );
          if (sessaoToUpdate) {
            sessaoToUpdate.feedback = result.feedbackNovo.feedback;
          }
        }
        this.openDialog = null;
      });
  }
}
