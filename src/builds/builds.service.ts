import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBuildDto } from './dto/create-build.dto';
import { UpdateBuildDto } from './dto/update-build.dto';
import { Build } from './entities/build.entity';

@Injectable()
export class BuildsService {
  private builds: Build[] = [
    {
      id: 'kb-101',
      buildName: 'Envoy Obscura Edition',
      baseKit: 'Mode Envoy (Mirage Aluminum / Copper Weight)',
      layoutSize: '65%',
      mountingStyle: 'Lattice Block',
      switchModel: 'Gateron Oil King (Krytox 205g0)',
      switchType: 'Linear',
      keycapSet: 'GMK White-on-Black (WoB) ABS',
      soundProfile: 'Creamy',
      estimatedCost: 4650000,
      isFavorite: true,
      tags: ['aluminum', 'copper-weight', 'daily'],
      createdAt: new Date('2026-01-10T09:00:00.000Z'),
    },
    {
      id: 'kb-102',
      buildName: 'Neo Studio Monolith',
      baseKit: 'Qwertykeys Neo65 (Anodized Silver / Brass)',
      layoutSize: '65%',
      mountingStyle: 'Gasket Mount',
      switchModel: 'Gazzew Boba U4T 62g',
      switchType: 'Tactile',
      keycapSet: 'PBTfans Resonance Double-Shot',
      soundProfile: 'Thocky',
      estimatedCost: 2850000,
      isFavorite: false,
      tags: ['brass', 'tactile'],
      createdAt: new Date('2026-01-15T14:30:00.000Z'),
    },
    {
      id: 'kb-103',
      buildName: 'Acoustica 75 Daily',
      baseKit: 'Monsgeek M1W V3 (Black CNC Aluminum)',
      layoutSize: '75%',
      mountingStyle: 'Gasket Mount',
      switchModel: 'Vertex V1 Linear (Factory Lubed)',
      switchType: 'Linear',
      keycapSet: 'Osume Dusk Cherry Profile PBT',
      soundProfile: 'Thocky',
      estimatedCost: 2150000,
      isFavorite: true,
      tags: ['wireless', 'budget-friendly'],
      createdAt: new Date('2026-02-01T11:15:00.000Z'),
    },
    {
      id: 'kb-104',
      buildName: 'Typist Tactile Archive',
      baseKit: 'Luminkey80 TKL (E-Coated Warm White)',
      layoutSize: 'TKL',
      mountingStyle: 'Top Mount',
      switchModel: 'Kailh Box Jade Clickbar',
      switchType: 'Clicky',
      keycapSet: 'CRP Tulip R4 Dye-Sub PBT',
      soundProfile: 'Clacky',
      estimatedCost: 3900000,
      isFavorite: false,
      tags: ['tkl', 'clicky'],
      createdAt: new Date('2026-02-12T16:45:00.000Z'),
    },
  ];

  private nextIdCounter = 105;

  create(createBuildDto: CreateBuildDto): Build {
    const duplicate = this.builds.some(
      (b) =>
        b.buildName.trim().toLowerCase() ===
        createBuildDto.buildName.trim().toLowerCase(),
    );

    if (duplicate) {
      throw new ConflictException(
        `Build with name "${createBuildDto.buildName}" already exists.`,
      );
    }

    const newBuild: Build = {
      id: `kb-${this.nextIdCounter++}`,
      buildName: createBuildDto.buildName,
      baseKit: createBuildDto.baseKit,
      layoutSize: createBuildDto.layoutSize,
      mountingStyle: createBuildDto.mountingStyle,
      switchModel: createBuildDto.switchModel,
      switchType: createBuildDto.switchType,
      keycapSet: createBuildDto.keycapSet,
      soundProfile: createBuildDto.soundProfile,
      estimatedCost: createBuildDto.estimatedCost,
      isFavorite: createBuildDto.isFavorite ?? false,
      tags: createBuildDto.tags ?? [],
      createdAt: new Date(),
    };

    this.builds.unshift(newBuild);
    return newBuild;
  }

  findAll(): Build[] {
    return this.builds;
  }

  findOne(id: string): Build {
    const build = this.builds.find((b) => b.id === id);
    if (!build) {
      throw new NotFoundException(`Keyboard build with ID "${id}" not found.`);
    }
    return build;
  }

  update(id: string, updateBuildDto: UpdateBuildDto): Build {
    const index = this.builds.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Keyboard build with ID "${id}" not found.`);
    }

    if (updateBuildDto.buildName) {
      const duplicate = this.builds.some(
        (b) =>
          b.id !== id &&
          b.buildName.trim().toLowerCase() ===
            updateBuildDto.buildName!.trim().toLowerCase(),
      );
      if (duplicate) {
        throw new ConflictException(
          `Build with name "${updateBuildDto.buildName}" already exists.`,
        );
      }
    }

    const updatedBuild: Build = {
      ...this.builds[index],
      ...updateBuildDto,
    };

    this.builds[index] = updatedBuild;
    return updatedBuild;
  }

  remove(id: string): { message: string; id: string } {
    const index = this.builds.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Keyboard build with ID "${id}" not found.`);
    }

    this.builds.splice(index, 1);
    return {
      message: `Keyboard build "${id}" has been deleted.`,
      id,
    };
  }
}
